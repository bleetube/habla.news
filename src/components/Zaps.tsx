import { useMemo } from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { useAtom } from "jotai";

import { pubkeyAtom } from "@habla/state";
import ZapIcon from "@habla/icons/Zap";
import { getZapRequest, getZapAmount } from "@habla/nip57";
import { ZAP } from "@habla/const";
import { formatShortNumber } from "@habla/format";

export default function Zaps({ event, zaps }) {
  const [pubkey] = useAtom(pubkeyAtom);
  const zappers = useMemo(() => {
    return zaps
      .map((z) => {
        return { ...getZapRequest(z), amount: getZapAmount(z) };
      })
      .filter((z) => z.pubkey !== event.pubkey);
  }, [zaps]);
  const zapped = zappers.some((z) => z.pubkey === pubkey);
  const zapsTotal = useMemo(() => {
    return zappers.reduce((acc, { amount }) => {
      return acc + amount;
    }, 0);
  }, [zappers]);

  return (
    <Flex alignItems="center" gap="2">
      <Icon color={zapped ? "purple.500" : "secondary"} as={ZapIcon} />
      <Text fontSize="xl">{formatShortNumber(zapsTotal)}</Text>
    </Flex>
  );
}