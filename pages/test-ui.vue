<template>
  <main>
    <hr />
    <section id="section-1">
      <header>
        <h2>Section Heading</h2>
        <p>Section Subheading</p>
      </header>
      <aside>
        <h3>Card heading</h3>
        <p>Card content*</p>
        <p><small>*with small content</small></p>
      </aside>
      <aside>
        <h3>Card heading</h3>
        <p>Card content <sup>with notification</sup></p>
      </aside>
      <aside>
        <h3>Card heading</h3>
        <p>Card content</p>
      </aside>
    </section>
    <hr />
    <section>
      <blockquote>
        "Quote"
        <footer><i>- Attribution</i></footer>
      </blockquote>
    </section>
    <hr />
    <section>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Col A</th>
            <th>Col B</th>
            <th>Col C</th>
          </tr>
        </thead>
        <tr>
          <td>Row 1</td>
          <td>Cell A1</td>
          <td>Cell B1</td>
          <td>Cell C1</td>
        </tr>
        <tr>
          <td>Row 2</td>
          <td>Cell A2</td>
          <td>Cell B2</td>
          <td>Cell C2</td>
        </tr>
      </table>
    </section>
    <hr />
    <article>
      <h2>Left-aligned header</h2>
      <p>Left-aligned paragraph</p>
      <aside>
        <p>Article callout</p>
      </aside>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      <figure>
        <img
          alt="Stock photo"
          src="https://via.placeholder.com/1080x500?text=Amazing+stock+photo"
        />
        <figcaption><i>Image caption</i></figcaption>
      </figure>
    </article>
    <hr />
    <div>
      <details>
        <summary>Expandable title</summary>
        <p>Revealed content</p>
      </details>
      <details>
        <summary>Another expandable title</summary>
        <p>More revealed content</p>
      </details>
      <br />
      <p>Inline <code>code</code> snippets</p>
      <pre>
                <code>
// preformatted code block
                </code>
            </pre>
    </div>
    <hr />
    <section>
      <form>
        <header>
          <h2>Form title</h2>
        </header>
        <label for="input1">Input label:</label>
        <input
          id="input1"
          type="text"
          name="input1"
          size="20"
          placeholder="Input1"
        />
        <label for="select1">Select label:</label>
        <select id="select1">
          <option value="option1">option1</option>
          <option value="option2">option2</option>
        </select>
        <label for="textarea1">Textarea label:</label>
        <textarea id="textarea1" cols="40" rows="5"></textarea>
        <button type="submit">Submit</button>
      </form>
    </section>
  </main>
</template>
