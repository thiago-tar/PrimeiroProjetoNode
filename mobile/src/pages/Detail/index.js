import React from 'react'
import { View, TouchableOpacity, Image, Text, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons'

import logoImg from '../../Assets/logo.png';
import styles from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Details() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;

    const message = `Olá ${incident.Nome}, estou entrando em contato pois gostaria de ajudar no caso "${incident.Titulo}" com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.valor)}`;

    function navigateBack() {
        navigation.goBack();
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Heroi do cass: ${incident.Titulo}`,
            recipients: [incident.Email],
            body: message
        });
    }

    function sendWhatsApp() {
        Linking.openURL(`whatsapp://send?phone=${incident.Whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>
            <View style={styles.incident}>
                <Text style={styles.incidentProperty, { marginTop: 0 }}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.Nome} de {incident.Cidade}/{incident.Uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.Titulo}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                    }).format(incident.valor)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>
                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsApp}
                    >
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendEmail}
                    >
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}