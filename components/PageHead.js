import Head from "next/head";

const PageHead = ({ pageTitle = "" }) => {
  return (
    <div>
      <Head>
        <title>{`${pageTitle ? pageTitle : "Behide"}`}</title>
        <meta
          name="description"
          content={`Behide - A leather product company ${
            pageTitle ? "| ${pageTitle}" : ""
          } `}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default PageHead;
