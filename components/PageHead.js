import Head from "next/head";

const PageHead = ({ pageTitle = "" }) => {
  return (
    <div>
      <Head>
        <title>{`Behide - ${pageTitle}`}</title>
        <meta
          name="description"
          content={`Behide - A leather product company ${
            pageTitle ? "| ${pageTitle}" : ""
          } `}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
    </div>
  );
};

export default PageHead;
