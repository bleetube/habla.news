import Head from "next/head";
import dynamic from "next/dynamic";

import pool, { defaultRelays } from "@habla/pool";
import { decodeNevent } from "@habla/nostr";
import { useEvent } from "@habla/nostr/hooks";
import Layout from "@habla/layouts/Layout";

const Event = dynamic(() => import("@habla/components/Event"), {
  ssr: false,
});

export default function Nevent({ id, author, relays, metadata }) {
  const { title, summary, image } = metadata ?? {
    title: "Habla",
    summary: "Speak your mind",
  };
  const event = useEvent(
    {
      ids: [id],
      authors: [author],
    },
    { relays }
  );
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="og:title" content={title} />
        <meta property="og:type" content="article" />
        <meta name="og:description" content={summary} />
        {image && <meta name="og:image" content={image} />}
      </Head>
      <Layout>{event && <Event event={event} />}</Layout>
    </>
  );
}

export async function getServerSideProps({ query }) {
  const { nevent } = query;
  try {
    const { id, author, relays } = decodeNevent(nevent);
    const event = await pool.get([...relays, ...defaultRelays], {
      ids: [id],
      authors: [author],
    });
    // todo: generic event metadata
    const metadata = {
      title: event?.id,
      summary: event?.content,
    };
    return {
      props: {
        metadata,
        id,
        author,
        relays,
      },
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
}