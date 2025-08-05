import Base from "./base.page.tsx";
import { header } from "./header.ts";

export default (
  { content, title, search, showPostsList, bio, icon }: Lume.Data,
  helpers: Lume.Helpers,
) => {
  const posts = search.pages().filter((page) => page.type !== "page");
  const tags = [...new Set(posts.map((page) => page.tags).flat())];
  return (
    <Base title={title || "title"} icon={icon}>
      <style>
        {`
      .invisibility{ display:none }
      .post { display: var(--display, block); }
      ${
          tags.map((tag) =>
            `#tag-${tag}:target ~ main .post:not([tag~="${tag}"])`
          ).join(",")
        }{ --display: none; }
      ${
          tags.map((tag) => `#tag-${tag}:target ~ main .clear-filter`).join(",")
        }{ display: block}
        
      `}
      </style>
      {tags.map((tag) => (
        <a class="invisibility" href={`#tag-${tag}`} id={`tag-${tag}`}></a>
      ))}
      <main class="container">
        <section>
          <article>
            <h1>{title}</h1>
            {bio && (
              <>
                {bio}
                <br />
              </>
            )}

            {[...Object.entries(header.nav), ["rss", "/feed.xml"]].map((
              [key, value],
              index,
            ) => (
              <>
                <span>{index !== 0 && " | "}</span>
                <a
                  href={value as string}
                  target={value.includes("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                >
                  {key}
                </a>
              </>
            ))}
          </article>
        </section>

        <hr />
        {content && (
          <section>
            <article class="md">
              {{ __html: content }}
            </article>
            {showPostsList && <hr />}
          </section>
        )}
        {showPostsList && (
          <section class="posts">
            <a href="#" class="invisibility clear-filter">clear filters</a>
            {posts.map((page) => (
              <article class="post" tag={page.tags.join(" ")}>
                <div>
                  <time
                    datetime={page.date.toISOString()}
                  >
                    {helpers.date(page.date)}
                  </time>{" "}
                  <span>
                    <a href={page.url}>{page.title}</a>
                  </span>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </Base>
  );
};
