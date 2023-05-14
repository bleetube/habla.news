import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";

import Markdown from "@habla/markdown/Markdown";
import { useUser } from "@habla/nostr/hooks";
import User from "./User";
import FollowButton from "@habla/components/nostr/FollowButton";

function Bio({ profile }) {
  return profile?.about ? <Markdown content={profile?.about} /> : null;
}

export default function UserCard({ pubkey, size = "sm", ...rest }) {
  const user = useUser(pubkey);
  return (
    <Card variant="user" size={size}>
      <CardHeader>
        <User size="md" pubkey={pubkey} />
      </CardHeader>
      <CardBody>{user?.about && <Bio profile={user} />}</CardBody>
      <CardFooter>
        <FollowButton pubkey={pubkey} />
      </CardFooter>
    </Card>
  );
}
