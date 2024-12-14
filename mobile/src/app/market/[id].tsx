import { useEffect, useRef, useState } from "react";
import { Alert, Modal, ScrollView, StatusBar, View } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";

import { api } from "@/services/api";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/Market/cover";
import { Details, PropsDetails } from "@/components/Market/details";
import Coupon from "@/components/Market/coupon";
import { Button } from "@/components/Button";
import { CameraView, useCameraPermissions } from "expo-camera";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Market() {
  const [cupon, setCupon] = useState<string>();
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);
  const [isCouponFetching, setIsCouponFetching] = useState(true);
  const [isVisibleCameraModal, setIsVisibleCameraModal] = useState(false);

  const [_, requestPermission] = useCameraPermissions();
  const params = useLocalSearchParams<{ id: string }>();

  const qrLock = useRef(false);

  async function fetchMarket() {
    try {
      const { data } = await api.get("/markets/" + params.id);

      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os dados.", [
        {
          text: "OK",
          onPress: () => router.back(),
        },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Câmera", "Você precisa habilitar o uso da câmera");
      }

      qrLock.current = false;
      setIsVisibleCameraModal(true);
    } catch (error) {
      console.error(error);
      Alert.alert("Câmera", "Não foi possível acessar a câmera");
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsCouponFetching(true);

      const { data } = await api.patch("/coupons/" + id);

      Alert.alert("Cupom", data.coupon);
      setCupon(data.coupon);
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível utilizar o cupom");
    } finally {
      setIsCouponFetching(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisibleCameraModal(false);
    Alert.alert(
      "Cupom",
      "Não é possível reutilizar um cupom resgatado. Deseja realmente resgatar o cupom?",
      [
        {
          style: "cancel",
          text: "Não",
        },
        {
          text: "Sim",
          onPress: () => getCoupon(id),
        },
      ]
    );
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id, cupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href={"/home"} />;
  }

  return (
    <View>
      <StatusBar barStyle="light-content" hidden={isVisibleCameraModal} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={data.cover} />
        <Details data={data} />
        {cupon && <Coupon code={cupon} />}
      </ScrollView>
      
      <View style={{ padding: 32 }}>
        <Button onPress={handleOpenCamera}>
          <Button.Title>Ler QR code</Button.Title>
        </Button>
      </View>

      <Modal style={{ flex: 1 }} visible={isVisibleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => {
                handleUseCoupon(data);
              }, 500);
            }
          }}
        />

        <View style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
          <Button onPress={() => setIsVisibleCameraModal(false)}>
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}
