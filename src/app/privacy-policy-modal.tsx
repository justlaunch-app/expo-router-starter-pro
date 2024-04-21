import { ScrollView, View } from 'react-native';
import { SafeAreaView } from '@components/core/safe-area-view';
import { StyledText as Text } from '@components/core/text/styled-text';
import { useRouter } from 'expo-router';
import { PageHeader as Header } from '@components/ui/header/page-header';
import { Button } from '@components/core/button/base-button';

export default function Terms({
  businessEmail,
}: Readonly<{ businessEmail: string }>) {
  const router = useRouter();

  return (
    <SafeAreaView>
      <Header title="Privacy Policy" />
      <ScrollView className="pb-20">
        <View>
          <Text>
            We value your privacy highly. This Privacy Policy delineates our
            practices in gathering, utilizing, safeguarding, and disclosing your
            personal information. It also elucidates the options you possess
            concerning your information when utilizing our service.
          </Text>

          <Text>
            Our commitment is unwavering in protecting the privacy of both our
            website and service users. This policy articulates how we handle and
            safeguard your personal information.
          </Text>

          <Text>
            We gather information directly from you, such as when you create an
            account, reach out to us, engage in an online survey, or utilize our
            online support and chat features. Additionally, we automatically
            collect information as you navigate our website or use our services,
            encompassing usage details, IP addresses, and data obtained through
            cookies and similar tracking technologies.
          </Text>

          <Text>
            Rest assured, we do not sell your personal information. We may,
            however, share information with third-party entities that assist us
            in operating, improving, integrating, customizing, supporting, and
            promoting our services. Furthermore, we may divulge your information
            to comply with relevant laws, safeguard the rights and safety of our
            company, users, or others, or as part of a business transaction such
            as a merger or asset sale.
          </Text>

          <Text>
            You possess rights and choices regarding the information we collect
            and its usage. This encompasses the right to access, rectify,
            update, or request the deletion of your personal information.
          </Text>

          <Text>{businessEmail || ''}</Text>
        </View>
      </ScrollView>

      <Button title="OK" onPress={() => router.back()} />
    </SafeAreaView>
  );
}
