import { Badge, Card, Container, Group, Space, useMantineTheme } from '@mantine/core';
import { useState } from 'react';
import { formatDistanceToNow, subMinutes } from 'date-fns';
import { IMessageAction } from '@novu/shared';

import { ActionBlockContainer } from './ActionBlockContainer';
import AvatarContainer from './AvatarContainer';

import { colors, shadows, Text, Title } from '@novu/design-system';
import { ButtonsTemplatesPopover } from '../ButtonsTemplatesPopover';

function minutesAgo(num: number): string {
  return formatDistanceToNow(subMinutes(new Date(), num), { addSuffix: true });
}

export function InAppWidgetPreview({
  readonly,
  children,
  value,
  onChange,
  enableAvatar,
  preview = false,
}: {
  readonly: boolean;
  preview?: boolean;
  children: JSX.Element;
  value: IMessageAction | undefined;
  onChange: (data: any) => void;
  enableAvatar: boolean;
}) {
  const theme = useMantineTheme();
  const [isButtonsTemplateVisible, setIsButtonsTemplateVisible] = useState<boolean>(false);
  const [isButtonsTemplateSelected, setIsButtonsTemplateSelected] = useState<boolean>(
    !!value?.buttons && value?.buttons?.length !== 0
  );
  const [avatarContainerOpened, setAvatarContainerOpened] = useState(false);

  function onButtonAddClickHandle() {
    setIsButtonsTemplateVisible(true);
  }

  function onRemoveTemplate() {
    setIsButtonsTemplateSelected(false);
    onChange({});
  }

  const editableContent = (
    <ButtonsTemplatesPopover
      isVisible={isButtonsTemplateVisible}
      setIsPopoverVisible={setIsButtonsTemplateVisible}
      setTemplateSelected={setIsButtonsTemplateSelected}
      onChange={onChange}
    >
      <Container
        fluid
        sx={{
          position: 'relative',
          padding: '15px 25px 0px',
          borderRadius: '7px',
          backgroundColor: theme.colorScheme === 'dark' ? colors.B20 : colors.white,
          boxShadow: theme.colorScheme === 'dark' ? shadows.dark : shadows.medium,
          width: preview ? undefined : '100%',

          '&:before': {
            content: '""',
            position: 'absolute',
            left: '0',
            top: '0',
            right: '0',
            bottom: '0',
            width: '5px',
            borderRadius: ' 7px 0 0 7px',
            background: colors.vertical,
          },

          ...(readonly && !preview
            ? {
                backgroundColor: theme.colorScheme === 'dark' ? colors.B20 : colors.B98,
                color: theme.colorScheme === 'dark' ? colors.B40 : colors.B70,
                opacity: 0.6,
              }
            : {}),
          ...(avatarContainerOpened && { opacity: 0.4 }),
        }}
      >
        <Group position="apart">
          <div style={{ width: '100%' }}>
            <Group position="left" spacing={10} noWrap>
              {enableAvatar && (
                <AvatarContainer
                  opened={avatarContainerOpened}
                  setOpened={setAvatarContainerOpened}
                  readonly={readonly}
                />
              )}

              <div style={{ flexGrow: 1 }}>
                <Text weight="bold">{children}</Text>
                <Text mt={5} color={colors.B60}>
                  {minutesAgo(5)}
                </Text>
              </div>
            </Group>
            <ActionBlockContainer
              value={value}
              onChange={onChange}
              onButtonAddClickHandle={onButtonAddClickHandle}
              onRemoveTemplate={onRemoveTemplate}
              isButtonsTemplateSelected={isButtonsTemplateSelected}
              readonly={readonly}
            />
          </div>
        </Group>
      </Container>
    </ButtonsTemplatesPopover>
  );

  if (!preview) {
    return editableContent;
  }

  return (
    <Card withBorder sx={styledCard}>
      <Card.Section>
        <Group position="apart" sx={{ padding: '15px' }}>
          <Group spacing={10}>
            <Title>Notifications</Title>
            <Badge
              sx={{
                padding: 0,
                width: 20,
                height: 20,
                pointerEvents: 'none',
                border: 'none',
                backgroundImage: colors.horizontal,
                color: colors.white,
                fontWeight: 'bold',
                fontSize: '12px',
              }}
              radius={100}
            >
              1
            </Badge>
          </Group>
          <Text color={colors.B60}>Mark all as read</Text>
        </Group>
      </Card.Section>
      <Card.Section sx={{ padding: '15px' }}>
        {editableContent}
        <Container
          mt={10}
          fluid
          sx={{
            padding: '15px 25px 16px',
            borderRadius: '7px',
            backgroundColor: theme.colorScheme === 'dark' ? colors.B17 : colors.BGLight,
            opacity: '0.5',
          }}
        >
          <Text color={colors.B60}>Notification Example</Text>
          <Text mt={5} color={theme.colorScheme === 'dark' ? colors.B40 : colors.B70}>
            {minutesAgo(10)}
          </Text>
        </Container>
        <Container
          mt={10}
          fluid
          sx={{
            padding: '15px 25px 16px',
            borderRadius: '7px',
            backgroundColor: theme.colorScheme === 'dark' ? colors.B17 : colors.BGLight,
            opacity: '0.5',
          }}
        >
          <Text color={colors.B60}>Notification Example</Text>
          <Text mt={5} color={theme.colorScheme === 'dark' ? colors.B40 : colors.B70}>
            {minutesAgo(25)}
          </Text>
        </Container>
        <Space h={100} />
      </Card.Section>
      <Card.Section sx={{ padding: '15px' }}>
        <Group position="center" spacing={10}>
          <Text color={theme.colorScheme === 'dark' ? colors.B40 : colors.B70}>Powered By</Text>
          <Footer />
        </Group>
      </Card.Section>
    </Card>
  );
}

const styledCard = (theme) => ({
  backgroundColor: 'transparent',
  borderRadius: '7px',
  borderColor: theme.colorScheme === 'dark' ? colors.B30 : colors.B80,
});

export function Footer() {
  return (
    <a
      rel="noreferrer"
      target="_blank"
      href="https://novu.co?utm_source=in-app-widget"
      style={{ display: 'flex', width: 60 }}
    >
      <svg width="107" height="16" viewBox="0 0 1049 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          // eslint-disable-next-line max-len
          d="M231 120.241C231 128.307 221.208 132.301 215.567 126.536L100.084 8.50548C115.699 2.9969 132.5 0 150 0C179.836 0 207.638 8.711 231 23.7285V120.241ZM273 64.1228V120.241C273 165.946 217.51 188.577 185.546 155.908L61.3582 28.9807C24.1534 56.2779 0 100.318 0 150C0 181.941 9.98339 211.55 27 235.877V180.059C27 134.354 82.4899 111.723 114.454 144.392L238.471 271.145C275.773 243.857 300 199.758 300 150C300 118.059 290.017 88.45 273 64.1228ZM84.433 173.764L199.697 291.571C184.144 297.031 167.419 300 150 300C120.164 300 92.3624 291.289 69 276.272V180.059C69 171.993 78.7923 167.999 84.433 173.764Z"
          fill="url(#paint0_linear_1301_3067)"
        />
        <path
          // eslint-disable-next-line max-len
          d="M487.303 223.326V140.944C487.303 126.727 483.892 115.918 477.07 108.517C470.248 101.116 459.527 97.4157 444.908 97.4157C434.967 97.4157 427.073 98.3895 421.225 100.337C415.378 102.09 411.674 103.356 410.115 104.135V223.326H380V84.8539C380.78 84.4644 382.924 83.588 386.432 82.2247C389.941 80.8614 394.619 79.4007 400.467 77.8427C406.314 76.2846 413.136 74.9213 420.933 73.7528C428.73 72.5843 437.306 72 446.662 72C457.383 72 467.129 73.4607 475.9 76.382C484.672 79.1086 492.079 83.1011 498.121 88.3596C504.359 93.618 509.134 99.9476 512.448 107.348C515.761 114.749 517.418 123.124 517.418 132.472V223.326H487.303Z"
          fill="currentColor"
        />
        <path
          // eslint-disable-next-line max-len
          d="M713.257 150C713.257 161.101 711.308 171.423 707.41 180.966C703.706 190.509 698.444 198.787 691.621 205.798C684.799 212.614 676.613 218.067 667.061 222.157C657.51 226.052 646.985 228 635.485 228C623.984 228 613.361 226.052 603.615 222.157C594.064 218.067 585.878 212.614 579.055 205.798C572.233 198.787 566.873 190.509 562.975 180.966C559.271 171.423 557.419 161.101 557.419 150C557.419 138.899 559.271 128.577 562.975 119.034C566.873 109.491 572.233 101.311 579.055 94.4944C585.878 87.4831 594.064 82.03 603.615 78.1348C613.361 74.0449 623.984 72 635.485 72C646.985 72 657.51 74.0449 667.061 78.1348C676.613 82.03 684.799 87.4831 691.621 94.4944C698.444 101.311 703.706 109.491 707.41 119.034C711.308 128.577 713.257 138.899 713.257 150ZM681.973 150C681.973 142.21 680.901 135.101 678.757 128.674C676.613 122.052 673.494 116.404 669.401 111.73C665.502 106.861 660.629 103.161 654.782 100.629C649.129 97.9026 642.697 96.5393 635.485 96.5393C628.078 96.5393 621.45 97.9026 615.603 100.629C609.95 103.161 605.077 106.861 600.984 111.73C597.085 116.404 594.064 122.052 591.92 128.674C589.776 135.101 588.704 142.21 588.704 150C588.704 157.79 589.776 164.996 591.92 171.618C594.064 178.045 597.085 183.693 600.984 188.562C605.077 193.236 609.95 196.936 615.603 199.663C621.45 202.195 628.078 203.461 635.485 203.461C642.697 203.461 649.129 202.195 654.782 199.663C660.629 196.936 665.502 193.236 669.401 188.562C673.494 183.693 676.613 178.045 678.757 171.618C680.901 164.996 681.973 157.79 681.973 150Z"
          fill="currentColor"
        />
        <path
          // eslint-disable-next-line max-len
          d="M888.255 83.1011C887.086 87.3858 885.039 93.1311 882.115 100.337C879.387 107.348 876.17 115.236 872.467 124C868.764 132.764 864.67 142.015 860.187 151.753C855.899 161.296 851.513 170.644 847.03 179.798C842.742 188.757 838.551 197.228 834.458 205.213C830.559 213.004 827.148 219.528 824.224 224.787H792.94C789.431 218.554 785.728 211.738 781.829 204.337C778.126 196.742 774.325 189.146 770.427 181.551C766.723 173.76 763.117 166.067 759.609 158.472C756.1 150.876 752.786 143.865 749.668 137.438C746.744 130.816 744.113 124.974 741.774 119.91C739.629 114.846 737.973 110.951 736.803 108.225C735.634 105.498 734.464 102.577 733.295 99.4607C732.125 96.3446 731.54 93.4232 731.54 90.6966C731.54 87.191 732.71 83.9775 735.049 81.0562C737.388 78.1348 741.384 76.6742 747.036 76.6742C750.935 76.6742 753.956 77.0637 756.1 77.8427C758.244 78.6217 759.414 79.1086 759.609 79.3034C762.922 88.4569 766.723 98.4869 771.011 109.393C775.495 120.3 779.978 131.109 784.461 141.82C789.139 152.337 793.622 162.464 797.91 172.202C802.199 181.745 805.999 189.828 809.313 196.449C811.652 191.97 814.673 185.64 818.377 177.461C822.275 169.086 826.271 159.933 830.364 150C834.653 140.067 838.941 129.843 843.229 119.326C847.517 108.809 851.318 99.1685 854.632 90.4045C856.191 86.1198 858.14 82.809 860.479 80.4719C862.818 77.9401 866.717 76.6742 872.175 76.6742C876.853 76.6742 880.556 77.5506 883.285 79.3034C886.209 81.0562 887.866 82.3221 888.255 83.1011Z"
          fill="currentColor"
        />
        <path
          // eslint-disable-next-line max-len
          d="M1018.88 90.4045C1018.88 85.7303 1020.25 82.3221 1022.98 80.1798C1025.71 77.8427 1029.61 76.6742 1034.67 76.6742C1037.99 76.6742 1040.91 77.0637 1043.44 77.8427C1046.17 78.6217 1048.03 79.206 1049 79.5955V223.326C1047.64 223.715 1045.2 224.105 1041.69 224.494C1038.38 224.884 1034.28 225.273 1029.41 225.663C1024.54 226.247 1019.18 226.637 1013.33 226.831C1007.48 227.221 1001.54 227.416 995.495 227.416C977.757 227.416 963.333 225.273 952.223 220.989C941.307 216.704 932.633 210.472 926.201 202.292C918.209 191.97 914.213 178.24 914.213 161.101V90.4045C914.213 85.7303 915.578 82.3221 918.307 80.1798C921.035 77.8427 924.934 76.6742 930.002 76.6742C933.315 76.6742 936.239 77.0637 938.773 77.8427C941.502 78.6217 943.354 79.206 944.328 79.5955V157.888C944.328 172.689 948.032 183.79 955.439 191.191C963.041 198.592 975.808 202.292 993.74 202.292C1000.56 202.292 1006.02 202.097 1010.11 201.708C1014.4 201.124 1017.33 200.637 1018.88 200.247V90.4045Z"
          fill="currentColor"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1301_3067"
            x1="300"
            y1="0"
            x2="3.57628e-05"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0.231667" stopColor="#FF884D" />
            <stop offset="0.801667" stopColor="#E300BD" />
          </linearGradient>
        </defs>
      </svg>
    </a>
  );
}
