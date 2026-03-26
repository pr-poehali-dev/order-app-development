import { useEffect, useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "services", label: "Услуги" },
  { id: "price", label: "Прайс" },
  { id: "portfolio", label: "Портфолио" },
  { id: "about", label: "О мастере" },
  { id: "docs", label: "Документы" },
  { id: "reviews", label: "Отзывы" },
  { id: "contacts", label: "Контакты" },
];

const SERVICES = [
  {
    icon: "Paintbrush",
    title: "Покраска краскопультом",
    desc: "Быстро, ровно, без подтёков. Дерево и металл. Полный цикл: подготовка, грунт, 2–3 слоя.",
    items: ["Скамейки, урны, качели", "Заборы, ворота, навесы", "Беседки, веранды, бытовки", "Детские и спортивные площадки", "Входные группы подъездов"],
  },
  {
    icon: "Scissors",
    title: "Покос и порядок",
    desc: "Помогаю привести участок в порядок: кошу, убираю поросль, спиливаю небольшие деревья.",
    items: ["Кошу траву (триммером, ровно)", "Убираю поросль, кустарник", "Спиливаю небольшие деревья", "Частникам, соседям, УК и ТСЖ"],
  },
  {
    icon: "Hammer",
    title: "Демонтаж и расчистка",
    desc: "Берусь за задачи выходящие за рамки покраски. Разбираю, расчищаю, готовлю к строительству.",
    items: ["Разобрать старую постройку", "Расчистить участок под стройку", "Подготовить поверхность к работам", "Ликвидация последствий пожара"],
  },
];

const PRICES = [
  {
    category: "Покраска",
    icon: "Paintbrush",
    items: [
      { name: "Скамейка", price: "от 1 200 ₽" },
      { name: "Урна", price: "от 600 ₽" },
      { name: "Качели", price: "1 500 – 5 000 ₽" },
      { name: "Беседка, веранда", price: "5 000 – 15 000 ₽" },
      { name: "Бытовка", price: "4 000 – 10 000 ₽" },
    ],
  },
  {
    category: "Покос",
    icon: "Scissors",
    items: [
      { name: "Небольшой участок", price: "от 1 500 ₽" },
      { name: "Поросль, кустарник", price: "по договорённости" },
      { name: "Территория УК/ТСЖ", price: "по договорённости" },
    ],
  },
  {
    category: "Демонтаж",
    icon: "Hammer",
    items: [
      { name: "Небольшая постройка", price: "по договорённости" },
      { name: "Расчистка участка", price: "по договорённости" },
      { name: "Подготовка площадки", price: "по договорённости" },
    ],
  },
];

const PORTFOLIO_ITEMS = [
  { title: "Покраска беседки", tag: "Покраска", desc: "Полный цикл: подготовка, грунт, 3 слоя краски" },
  { title: "Покраска забора", tag: "Покраска", desc: "Металлический забор, безвоздушный краскопульт" },
  { title: "Покос территории", tag: "Покос", desc: "Привели участок в порядок за один день" },
  { title: "Демонтаж бани", tag: "Демонтаж", desc: "После пожара. 3 дня — и полная чистота" },
  { title: "Детская площадка", tag: "Покраска", desc: "Обновили цвет, защитили от коррозии" },
  { title: "Расчистка участка", tag: "Демонтаж", desc: "Подготовка площадки под новое строительство" },
];

const REVIEWS = [
  { name: "Светлана К.", text: "Дмитрий покрасил всю беседку за один день. Ровно, без запаха в доме. Настоящий профессионал!", service: "Покраска", stars: 5 },
  { name: "Алексей В.", text: "Обращался по покосу — пришёл вовремя, убрал аккуратно, не оставил мусора. Рекомендую.", service: "Покос", stars: 5 },
  { name: "ТСЖ «Уралец»", text: "Покрасили входные группы трёх подъездов. Быстро, качественно, документы в порядке.", service: "Покраска", stars: 5 },
  { name: "Марина Р.", text: "После пожара разобрал баню и расчистил участок. Три дня и всё готово — удивлена!", service: "Демонтаж", stars: 5 },
];

const DOCS = [
  { icon: "FileText", title: "Договор на выполнение работ", desc: "Заключаем до начала работ. Защищает обе стороны." },
  { icon: "Receipt", title: "Чек самозанятого", desc: "Официальный чек через приложение «Мой налог»." },
  { icon: "ClipboardList", title: "Лист осмотра с фотофиксацией", desc: "Для юрлиц: фиксируем состояние объекта до и после." },
  { icon: "FileCheck", title: "Акт выполненных работ", desc: "Подтверждает факт и объём выполненных работ." },
  { icon: "BadgeCheck", title: "Справка о самозанятости", desc: "Подтверждение статуса. Документы — в альбоме ВК." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".section-reveal");
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-12 section-reveal">
      <span className="divider-accent mb-4" />
      <h2 className="font-oswald text-4xl font-semibold text-foreground uppercase tracking-wide mb-3">{title}</h2>
      {subtitle && <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>}
    </div>
  );
}

export default function Index() {
  useReveal();
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV_ITEMS.map((n) => document.getElementById(n.id));
      const scrollY = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollY) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-md bg-background/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="font-oswald text-xl font-semibold tracking-widest text-foreground uppercase">
            МАХ<span className="text-primary">·</span>СТРОЙ
          </button>
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`nav-link text-sm font-golos font-medium uppercase tracking-wider transition-colors ${
                  activeSection === item.id ? "text-primary active" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-3">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-left text-sm font-golos font-medium uppercase tracking-wider transition-colors py-2 border-b border-border/50 ${
                  activeSection === item.id ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="hero-bg pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 lg:py-32 w-full">
          <div className="max-w-3xl">
            <div className="badge-official inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm text-primary font-golos font-medium mb-8">
              <Icon name="BadgeCheck" size={16} />
              Самозанятый · ИНН 661914015077 · Первоуральск
            </div>
            <h1 className="font-oswald uppercase leading-none mb-6">
              <span className="hero-line text-5xl sm:text-6xl lg:text-8xl text-foreground block">
                <span>Дмитрий</span>
              </span>
              <span className="hero-line text-5xl sm:text-6xl lg:text-8xl text-foreground block">
                <span>Голубничий</span>
              </span>
              <span className="hero-line text-2xl sm:text-3xl lg:text-4xl text-primary block mt-2">
                <span>Покраска · Покос · Демонтаж</span>
              </span>
            </h1>
            <p className="font-golos text-lg text-muted-foreground mb-10 max-w-xl leading-relaxed">
              Работаю официально, с документами и чеками. Цену называю после бесплатного осмотра. Убираю за собой, соблюдаю сроки.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("contacts")}
                className="bg-primary text-primary-foreground font-oswald font-medium uppercase tracking-widest text-sm px-8 py-4 hover:bg-primary/90 transition-colors"
              >
                Связаться
              </button>
              <button
                onClick={() => scrollTo("services")}
                className="border border-border text-foreground font-oswald font-medium uppercase tracking-widest text-sm px-8 py-4 hover:border-primary/50 hover:text-primary transition-colors"
              >
                Услуги
              </button>
            </div>
          </div>
          <div className="mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { val: "3+", label: "Направления работ" },
              { val: "100%", label: "Официально" },
              { val: "0 ₽", label: "Осмотр бесплатно" },
              { val: "ИНН", label: "661914015077" },
            ].map((s, i) => (
              <div key={i} className="section-reveal border border-border/50 p-5 bg-card/50">
                <div className="font-oswald text-3xl font-bold text-primary mb-1">{s.val}</div>
                <div className="font-golos text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Услуги" subtitle="Полный цикл работ — от осмотра до уборки территории" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="section-reveal card-hover border border-border bg-card p-8" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center mb-6">
                  <Icon name={s.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-oswald text-2xl font-semibold uppercase mb-3 text-foreground">{s.title}</h3>
                <p className="font-golos text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
                <ul className="space-y-2">
                  {s.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm font-golos text-muted-foreground">
                      <span className="text-primary mt-1 shrink-0">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="section-reveal mt-8 border border-primary/20 bg-primary/5 p-8">
            <div className="flex items-start gap-4">
              <Icon name="Zap" size={24} className="text-primary shrink-0 mt-1" />
              <div>
                <h4 className="font-oswald text-xl font-semibold uppercase text-foreground mb-3">Оборудование</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-golos text-sm text-muted-foreground">
                  <div>· Безвоздушный краскопульт (1200 Вт) — ровное покрытие</div>
                  <div>· Пневматический краскопульт — для сложных деталей</div>
                  <div>· Скорость в 5–10 раз выше кисти</div>
                  <div>· Соблюдаю закон о тишине</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section id="price" className="py-24 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Прайс" subtitle="Ориентировочные цены. Точная стоимость — после бесплатного осмотра объекта." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICES.map((cat, i) => (
              <div key={i} className="section-reveal price-card p-8" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex items-center gap-3 mb-6">
                  <Icon name={cat.icon} size={20} className="text-primary" />
                  <h3 className="font-oswald text-xl font-semibold uppercase text-foreground">{cat.category}</h3>
                </div>
                <div className="space-y-4">
                  {cat.items.map((item, j) => (
                    <div key={j} className="flex justify-between items-center border-b border-border/50 pb-4 last:border-0 last:pb-0">
                      <span className="font-golos text-sm text-muted-foreground">{item.name}</span>
                      <span className="font-oswald text-sm font-medium text-primary">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="section-reveal mt-6 flex items-center gap-3 text-sm font-golos text-muted-foreground bg-card border border-border p-5">
            <Icon name="Info" size={18} className="text-primary shrink-0" />
            Цены ориентировочные. Осмотр объекта бесплатный — звоните и договоримся!
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Портфолио" subtitle="Реальные объекты — всё можно проверить в сообществе ВКонтакте" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div key={i} className="section-reveal card-hover border border-border bg-card overflow-hidden group" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="h-48 bg-gradient-to-br from-secondary to-background flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
                  <Icon
                    name={item.tag === "Покраска" ? "Paintbrush" : item.tag === "Покос" ? "Scissors" : "Hammer"}
                    size={48}
                    className="text-border group-hover:text-primary/30 transition-colors"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-primary-foreground font-oswald text-xs uppercase tracking-wider px-3 py-1">
                      {item.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-oswald text-lg font-semibold uppercase text-foreground mb-2">{item.title}</h4>
                  <p className="font-golos text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-reveal mt-8 text-center">
            <p className="font-golos text-muted-foreground mb-4">Больше работ — в сообществе ВКонтакте</p>
            <a
              href="https://vk.com/club234852553"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary font-oswald text-sm uppercase tracking-widest px-6 py-3 hover:bg-primary/10 transition-colors"
            >
              <Icon name="ExternalLink" size={16} />
              Открыть сообщество ВК
            </a>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="О мастере" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="section-reveal">
              <h3 className="font-oswald text-3xl font-semibold uppercase text-foreground mb-2">Дмитрий Голубничий</h3>
              <p className="text-primary font-golos text-sm mb-6 uppercase tracking-wider">Первоуральск · Самозанятый</p>
              <div className="space-y-4 font-golos text-muted-foreground leading-relaxed">
                <p>Занимаюсь покраской краскопультом, покосом и демонтажом. Работаю официально — как самозанятый, с договором и чеками.</p>
                <p>Подхожу к делу основательно: убираю за собой, соблюдаю сроки. Цену называю честно — только после бесплатного осмотра объекта.</p>
                <p>Для юридических лиц — полный пакет документов: договор, акты, чеки, лист осмотра с фотофиксацией.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { icon: "BadgeCheck", text: "Официально оформлен" },
                  { icon: "Clock", text: "Соблюдаю сроки" },
                  { icon: "Trash2", text: "Убираю за собой" },
                  { icon: "Search", text: "Осмотр бесплатно" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-golos text-muted-foreground">
                    <Icon name={item.icon} size={16} className="text-primary shrink-0" />
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
            <div className="section-reveal">
              <div className="border border-primary/20 bg-primary/5 p-8 mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <Icon name="Quote" size={20} className="text-primary shrink-0 mt-1" />
                  <h4 className="font-oswald text-lg font-semibold uppercase text-foreground">МАХ группа</h4>
                </div>
                <p className="font-golos text-sm text-muted-foreground mb-4 leading-relaxed">
                  Место, где можно следить за моей работой: реальные объекты с фото, отчёты, ответы на вопросы. Чтобы вы могли видеть — всё делается честно и аккуратно.
                </p>
                <a
                  href="https://max.ru/join/dfe20"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-oswald text-sm uppercase tracking-wider hover:underline"
                >
                  <Icon name="ExternalLink" size={14} />
                  Вступить в МАХ группу
                </a>
              </div>
              <div className="border border-border bg-card p-6">
                <div className="font-oswald text-sm uppercase tracking-wider text-muted-foreground mb-3">Реквизиты</div>
                <div className="space-y-2 font-golos text-sm">
                  {[
                    { label: "ФИО", val: "Голубничий Дмитрий", accent: false },
                    { label: "Статус", val: "Самозанятый", accent: true },
                    { label: "ИНН", val: "661914015077", accent: false },
                    { label: "Город", val: "Первоуральск", accent: false },
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between border-b border-border/40 pb-2 last:border-0">
                      <span className="text-muted-foreground">{row.label}</span>
                      <span className={row.accent ? "text-primary" : "text-foreground"}>{row.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCS */}
      <section id="docs" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Документы" subtitle="Работаю официально — все документы предоставляются по запросу" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {DOCS.map((doc, i) => (
              <div key={i} className="section-reveal card-hover border border-border bg-card p-6 flex gap-4" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="w-10 h-10 bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                  <Icon name={doc.icon} size={20} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-oswald text-base font-semibold uppercase text-foreground mb-2">{doc.title}</h4>
                  <p className="font-golos text-sm text-muted-foreground leading-relaxed">{doc.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="section-reveal mt-6 border border-border bg-card p-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Icon name="FolderOpen" size={20} className="text-primary" />
              <span className="font-golos text-sm text-muted-foreground">Документы доступны в альбоме сообщества ВКонтакте</span>
            </div>
            <a
              href="https://vk.com/club234852553"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-primary/40 text-primary font-oswald text-xs uppercase tracking-widest px-4 py-2 hover:bg-primary/10 transition-colors"
            >
              <Icon name="ExternalLink" size={14} />
              Смотреть документы
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Отзывы" subtitle="Реальные отзывы от клиентов" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="section-reveal card-hover border border-border bg-card p-8" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex text-primary mb-4 gap-0.5">
                  {Array.from({ length: r.stars }).map((_, j) => (
                    <Icon key={j} name="Star" size={14} className="text-primary" />
                  ))}
                </div>
                <p className="font-golos text-muted-foreground leading-relaxed mb-6 italic">«{r.text}»</p>
                <div className="flex items-center justify-between">
                  <span className="font-oswald text-sm font-semibold uppercase text-foreground">{r.name}</span>
                  <span className="bg-primary/10 text-primary font-oswald text-xs uppercase tracking-wider px-3 py-1">{r.service}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionTitle title="Контакты" subtitle="Звоните или пишите — отвечу быстро" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="section-reveal space-y-4">
              <a
                href="tel:+79935039859"
                className="card-hover flex items-center gap-5 border border-border bg-card p-6 group"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Icon name="Phone" size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-oswald text-sm uppercase tracking-wider text-muted-foreground mb-1">Телефон</div>
                  <div className="font-oswald text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">8 (993) 503-98-59</div>
                </div>
              </a>
              <a
                href="https://vk.com/club234852553"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-5 border border-border bg-card p-6 group"
              >
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-oswald text-sm uppercase tracking-wider text-muted-foreground mb-1">Сообщество ВКонтакте</div>
                  <div className="font-oswald text-xl font-semibold text-foreground group-hover:text-primary transition-colors">vk.com/club234852553</div>
                </div>
              </a>
              <a
                href="https://max.ru/join/dfe20"
                target="_blank"
                rel="noopener noreferrer"
                className="card-hover flex items-center gap-5 border border-primary/30 bg-primary/5 p-6 group"
              >
                <div className="w-12 h-12 bg-primary/20 flex items-center justify-center">
                  <Icon name="MessageSquare" size={22} className="text-primary" />
                </div>
                <div>
                  <div className="font-oswald text-sm uppercase tracking-wider text-primary/70 mb-1">МАХ группа</div>
                  <div className="font-oswald text-xl font-semibold text-foreground group-hover:text-primary transition-colors">max.ru/join/dfe20</div>
                </div>
              </a>
            </div>
            <div className="section-reveal border border-border bg-card p-8">
              <h3 className="font-oswald text-2xl font-semibold uppercase text-foreground mb-6">Как работаем</h3>
              <div className="space-y-6">
                {[
                  { num: "01", title: "Звонок", desc: "Звоните или пишите в удобный мессенджер" },
                  { num: "02", title: "Осмотр", desc: "Приезжаю, осматриваю объект — бесплатно" },
                  { num: "03", title: "Договор", desc: "Называю цену, заключаем договор" },
                  { num: "04", title: "Работа", desc: "Выполняю в срок, убираю за собой" },
                  { num: "05", title: "Документы", desc: "Выдаю чек, акт, документы для юрлиц" },
                ].map((step, i) => (
                  <div key={i} className="flex gap-5 items-start">
                    <span className="font-oswald text-2xl font-bold text-primary/30 shrink-0 w-8">{step.num}</span>
                    <div>
                      <div className="font-oswald text-base font-semibold uppercase text-foreground mb-1">{step.title}</div>
                      <div className="font-golos text-sm text-muted-foreground">{step.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-card/50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-oswald text-sm uppercase tracking-widest text-muted-foreground">
            Дмитрий Голубничий · Самозанятый · ИНН 661914015077
          </div>
          <div className="font-golos text-sm text-muted-foreground">Первоуральск, 2026</div>
        </div>
      </footer>
    </div>
  );
}
