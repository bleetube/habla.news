import { Button, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useTranslation } from "next-i18next";

import useModeration from "@habla/hooks/useModeration";
import type { Tag } from "@habla/tags";

interface MuteReferenceButtonProps {
  reference: Tag;
}

export function MuteReferenceButton({ reference }: MuteReferenceButtonProps) {
  const { t } = useTranslation("common");
  const [tag, value] = reference;
  const { isTagMuted, muteTag, unmuteTag } = useModeration();
  const isMuted = isTagMuted(reference);

  function onMuteTag(isPrivate: boolean) {
    muteTag(reference, isPrivate);
  }

  function onUnmuteTag() {
    unmuteTag(reference);
  }

  return isMuted ? (
    <Button variant="outline" onClick={onUnmuteTag}>
      {t("unmute")}
    </Button>
  ) : (
    <Menu>
      <MenuButton variant="outline" as={Button} rightIcon={<ChevronDownIcon />}>
        {t("mute")}
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => onMuteTag()}>{t("public")}</MenuItem>
        <MenuItem onClick={() => onMuteTag(true)}>{t("private")}</MenuItem>
      </MenuList>
    </Menu>
  );
}

export function MuteTagButton({ tag }) {
  return <MuteReferenceButton reference={["t", tag]} />;
}

export default function MuteButton({ pubkey }) {
  return <MuteReferenceButton reference={["p", pubkey]} />;
}
