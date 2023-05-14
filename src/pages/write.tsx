import Head from "next/head";
import dynamic from "next/dynamic";

import { Text } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { pubkeyAtom } from "@habla/state";
import Layout from "@habla/layouts/Wide";

const Bookmarks = dynamic(() => import("@habla/components/nostr/Bookmarks"), {
  ssr: false,
});

export default function WritePage() {
  const [pubkey] = useAtom(pubkeyAtom);
  return (
    <>
      <Head>
        <title>Habla</title>
        <meta name="og:title" content="Habla" />
        <meta name="og:description" content="Speak your mind" />
      </Head>
      <Layout>
        {!pubkey && <Text>Log in to see bookmarks</Text>}
        {pubkey && <Bookmarks />}
      </Layout>
    </>
  );
}
