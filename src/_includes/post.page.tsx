import Base from "./base.page.tsx";

export default (
  { content, title, date, tags, description, footer, update, icon }: Lume.Data,
  helpers: Lume.Helpers,
) => (
  <Base title={title || "title"} isPost={true} icon={icon}>
    <header class="container">
      <h1>{title}</h1>
      <p>
        <time
          datetime={date.toISOString()}
        >
          {helpers.date(date)}
        </time>
        <span>{" "}&middot;{" "}</span>
        <a href="/">FBIK.</a>
      </p>
      {description && description !== "" && (
        <blockquote>{description}</blockquote>
      )}
      <hr />
    </header>
    <main class="container">
      <article>
        {{ __html: content }}
      </article>
      <article>
        <div class="tags">
          {tags.map((tag) => (
            <code class="tag">
              <a href={`/blog/#tag-${tag}`}>{`#${tag}`}</a>
            </code>
          ))}
        </div>

        <div>
          last updated:{" "}
          <time datetime={new Date(update || date).toISOString()}>
            {helpers.date(update || date)}
          </time>
        </div>

        {footer && footer !== "" && (
          <div>
            <hr />
            {{ __html: helpers.md(footer) }}
          </div>
        )}
      </article>
    </main>
  </Base>
);
