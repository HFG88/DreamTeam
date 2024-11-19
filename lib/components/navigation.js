import { ac, el } from "../elements";

export function constructNav(navArray) {
  const navElement =  el("ul", { class: "navigation__list" });
  for (const li of navArray) {
    const listItem = el(
      "li",
      { class: "navigation__item" },
      el(
        "a",
        { href: `/?type=${li.slug}`, class: "nav__link"},
        li.title
      )
    );

    ac(navElement, listItem);
  }

  return el('nav', { class: "navigation" }, navElement);
}
