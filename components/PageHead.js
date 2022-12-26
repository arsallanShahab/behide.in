import Head from "next/head";

const PageHead = ({ pageTitle }) => {
  return (
    <Head>
      <title>Behide {pageTitle ? ` - ${pageTitle}` : ""}</title>
      <meta
        name="description"
        content={`Behide - A leather product company ${
          pageTitle ? `| ${pageTitle}` : ""
        } `}
      />
    </Head>
  );
};

export default PageHead;
