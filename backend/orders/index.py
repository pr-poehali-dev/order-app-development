"""Приём и получение заявок на услуги мастера Дмитрия."""
import json
import os
import psycopg2


CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"], sslmode="disable")


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS_HEADERS, "body": ""}

    method = event.get("httpMethod", "GET")
    conn = get_conn()

    try:
        if method == "POST":
            body = json.loads(event.get("body") or "{}")
            name = body.get("name", "").strip()
            phone = body.get("phone", "").strip()
            service = body.get("service", "").strip()
            address = body.get("address", "").strip()
            comment = body.get("comment", "").strip()

            if not name or not phone:
                return {
                    "statusCode": 400,
                    "headers": CORS_HEADERS,
                    "body": json.dumps({"error": "Имя и телефон обязательны"}, ensure_ascii=False),
                }

            with conn.cursor() as cur:
                cur.execute(
                    "INSERT INTO orders (name, phone, service, address, comment) VALUES (%s, %s, %s, %s, %s) RETURNING id",
                    (name, phone, service or None, address or None, comment or None),
                )
                order_id = cur.fetchone()[0]
                conn.commit()

            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"success": True, "id": order_id}, ensure_ascii=False),
            }

        if method == "GET":
            with conn.cursor() as cur:
                cur.execute(
                    "SELECT id, name, phone, service, address, comment, created_at, status FROM orders ORDER BY created_at DESC LIMIT 100"
                )
                rows = cur.fetchall()

            orders = [
                {
                    "id": r[0],
                    "name": r[1],
                    "phone": r[2],
                    "service": r[3],
                    "address": r[4],
                    "comment": r[5],
                    "created_at": r[6].isoformat() if r[6] else None,
                    "status": r[7],
                }
                for r in rows
            ]
            return {
                "statusCode": 200,
                "headers": CORS_HEADERS,
                "body": json.dumps({"orders": orders}, ensure_ascii=False),
            }

    finally:
        conn.close()

    return {"statusCode": 405, "headers": CORS_HEADERS, "body": json.dumps({"error": "Method not allowed"})}