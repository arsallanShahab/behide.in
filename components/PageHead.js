import Head from 'next/head';

const PageHead = ({ pageTitle = '' }) => {
  return (
    <div>
      <Head>
        <title>{`${pageTitle ? pageTitle : 'Behide'}`}</title>
        <meta
          name="description"
          content={`Behide - A leather product company ${pageTitle ? '| ${pageTitle}' : ''} `}
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="theme-color" content="#22c55e" />
        {/* add link to manifest file */}
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
};

export default PageHead;
