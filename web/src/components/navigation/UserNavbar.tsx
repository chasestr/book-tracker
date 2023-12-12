import { Box, Flex, Image, Button } from "@chakra-ui/react";
import NextLink from "next/link";
import { useLogoutMutation } from "../../generated/graphql";
import { useApolloClient } from "@apollo/client";
import variables from "../../variables.module.scss";
import StandardButton from "../base/StandardButton";
import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { useRouter } from "next/router";

type NavbarOption = {
  readonly title: string;
  readonly href: string;
};

const navbarOptions: NavbarOption[] = [
  { title: "Books", href: "/" },
  { title: "New Book", href: "/create-book" },
  { title: "Logs", href: "/logs" },
  { title: "New Log", href: "/create-log" },
  { title: "Graphs", href: "/graphs"},
];

const emblaOptions = {
  loop: true,
  dragFree: true,
  inViewThreshold: 1.0,
  container: "embla__container",
};

const UserNavbar: React.FC<{ variant: string }> = (p) => {
  const apolloClient = useApolloClient();
  const router = useRouter();
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [emblaRef, embla] = useEmblaCarousel(
    {
      ...emblaOptions,
      align: "center",
      startIndex: selectedItem
        ? navbarOptions.indexOf(
            navbarOptions.find((button) => button.href === selectedItem) ||
              navbarOptions[0]
          )
        : 0,
    },
    [WheelGesturesPlugin()]
  );

  const NavbarItems = navbarOptions.map((o, idx) => (
    <Box
      className="embla__slide"
      key={idx}
      m={2}
      flex={{ base: "0 0 65%", sm: "0 0 40%", md: "0 0 25%" }}
      minW={0}
    >
      <NextLink href={o.href} passHref>
        <Button
          bg={
            o.href === selectedItem
              ? variables.light_blue
              : variables.extra_dark_mint
          }
          color={variables.white}
          _hover={{ transform: "scale(1.05)" }}
          width="100%"
        >
          {o.title}
        </Button>
      </NextLink>
    </Box>
  ));

  useEffect(() => {
    const currentHref = router.pathname;
    const matchingButton = navbarOptions.find(
      (button) => button.href === currentHref
    );

    if (matchingButton) {
      setSelectedItem(matchingButton.href);
    } else {
      setSelectedItem(null);
    }
  }, [router.pathname, navbarOptions]);

  useEffect(() => {
    if (!embla) return;
    embla.reInit({ ...emblaOptions, align: "center" });
  }, [embla]);

  return (
    <Flex
      p={4}
      position={"sticky"}
      top={0}
      zIndex={"sticky"}
      bg={variables.light_mint}
    >
      <Flex
        flex={1}
        minW={0}
        m="auto"
        align="center"
        px={4}
        maxW={p.variant === "regular" ? 800 : 400}
      >
        <NextLink href="/" passHref>
          <Image
            src={"/images/SS1.svg"}
            alt="StoryStash"
            width={50}
            minW={50}
            maxW={50}
            height={50}
            minH={50}
            maxH={50}
            color={variables.blue}
          />
        </NextLink>
        <Box
          className="embla"
          ref={emblaRef}
          overflow={"hidden"}
          mx={{ base: "8", md: "16", sm: "4" }}
          bg={variables.mint}
          borderRadius={"25px"}
        >
          <Box className="embla__container" display="flex" minW={0}>
            {NavbarItems}
          </Box>
        </Box>
        <StandardButton
          onClick={async () => {
            await logout({});
            await apolloClient.resetStore();
          }}
          isLoading={logoutFetching}
          minW="initial"
        >
          Logout
        </StandardButton>
      </Flex>
    </Flex>
  );
};

export default UserNavbar;
