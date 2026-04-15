import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOG_POSTS, getPostBySlug } from "@/data/blogs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: `${post.title} | Ranjot Singh & Associates LLP`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.dateIso,
      authors: [post.author],
    },
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --navy: #0a1628;
          --navy-mid: #112240;
          --gold: #c9a84c;
          --gold-light: #e4c97e;
          --cream: #faf8f3;
          --white: #ffffff;
          --text-dark: #1a1a2e;
          --text-muted: #6b7280;
          --radius: 12px;
        }
        html { scroll-behavior: smooth; }
        body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--text-dark); line-height: 1.65; }
        h1, h2 { font-family: 'Cormorant Garamond', serif; }
        .bp-wrap { min-height: 100vh; padding: 88px 5% 80px; max-width: 720px; margin: 0 auto; }
        .bp-back {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 0.875rem; color: var(--navy-mid); text-decoration: none; margin-bottom: 32px;
          font-weight: 500;
        }
        .bp-back:hover { color: var(--gold); }
        .bp-tag {
          font-size: 0.65rem; text-transform: uppercase; letter-spacing: 2px; color: var(--gold); font-weight: 600;
        }
        .bp-title { font-size: clamp(1.85rem, 4vw, 2.5rem); line-height: 1.2; margin: 12px 0 20px; color: var(--navy); }
        .bp-meta {
          display: flex; flex-wrap: wrap; gap: 12px 20px; padding-bottom: 28px; margin-bottom: 28px;
          border-bottom: 1px solid rgba(10,22,40,0.08); font-size: 0.875rem; color: var(--text-muted);
        }
        .bp-meta strong { color: var(--text-dark); font-weight: 600; }
        .bp-body p { margin-bottom: 1.15em; font-size: 1rem; color: var(--text-dark); }
        .bp-body p:last-child { margin-bottom: 0; }
        .bp-footer { margin-top: 48px; padding-top: 28px; border-top: 1px solid rgba(10,22,40,0.08); }
        .bp-footer a { color: var(--navy-mid); font-weight: 600; text-decoration: none; }
        .bp-footer a:hover { color: var(--gold); }
      `}</style>
      <article className="bp-wrap">
        <Link href="/#blog" className="bp-back">
          ← Back to articles
        </Link>
        <p className="bp-tag">{post.tag}</p>
        <h1 className="bp-title">{post.title}</h1>
        <div className="bp-meta">
          <span>
            <strong>Author</strong> — {post.author}
          </span>
          <span>
            <strong>Published</strong> — {post.date}
          </span>
          <span>
            <strong>Reading time</strong> — {post.readTimeMinutes} min
          </span>
        </div>
        <p style={{ fontSize: "1.05rem", color: "var(--text-muted)", marginBottom: "28px" }}>{post.excerpt}</p>
        <div className="bp-body">
          {post.content.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
        <footer className="bp-footer">
          <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
            {post.authorRole}
          </p>
          <p style={{ marginTop: "12px" }}>
            <Link href="/#contact">Book a consultation →</Link>
          </p>
        </footer>
      </article>
    </>
  );
}
