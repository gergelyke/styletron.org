import * as React from "react";
import Anchor from "./anchor";
import { useHover } from "./hooks";
import slugify from "../helpers/slugify";
import Code from "./code";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

const Heading = ({ element, children }) => {
  const [hoverRef, isHovered] = useHover();
  const slug = slugify(children);
  return React.createElement(
    element,
    { ref: hoverRef, id: slug },
    <React.Fragment>
      {children} <Anchor isVisible={isHovered} slug={slug} element={element} />
    </React.Fragment>
  );
};

export default {
  h1: ({ children }) => <Heading element="h1">{children}</Heading>,
  h2: ({ children }) => <Heading element="h2">{children}</Heading>,
  h3: ({ children }) => <Heading element="h3">{children}</Heading>,
  h4: ({ children }) => <Heading element="h4">{children}</Heading>,
  h5: ({ children }) => <Heading element="h5">{children}</Heading>,
  h6: ({ children }) => <Heading element="h6">{children}</Heading>,
  pre: ({ children }) => children,
  code: ({ children, metaString, className }) => {
    if (metaString === "live") {
      return <Code code={children} />;
    }
    const lang = className.split("-")[1];
    return (
      <SyntaxHighlighter language={lang} useInlineStyles={false}>
        {children}
      </SyntaxHighlighter>
    );
  }
};