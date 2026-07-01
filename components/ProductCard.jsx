"use client";

import { trackEvent } from "@/lib/umami";

export default function ProductCard() {
  return (
    <>
      <div className="eyebrow">Products</div>
      <a
        href="/book"
        className="product-card"
        onClick={() => trackEvent("get_book_click")}
      >
        <img src="/book.webp" alt="The Grit Chronicles book" />
        <span>Get the book</span>
      </a>
    </>
  );
}
