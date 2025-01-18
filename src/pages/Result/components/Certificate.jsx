import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Define styles for the certificate
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    padding: 40,
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E74C3C',
    textAlign: 'center',
    flex: 1,
  },
  subTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: '#34495E',
  },
  content: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
    lineHeight: 1.5,
  },
  nameField: {
    fontSize: 16,
    color: '#3498DB',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    fontSize: 12,
    color: '#7F8C8D',
  },
  watermark: {
    position: 'absolute',
    top: '40%',
    left: '30%',
    fontSize: 50,
    color: '#F5F5F5',
    transform: 'rotate(-45deg)',
  },
});

// Certificate component
export const Certificate = ({ name, quizName, score, date, schoolName }) => (
  <Document>
    <Page size="A4" orientation="portrait" style={styles.page}>
      <View style={styles.header}>
        <Image
          style={styles.logo}
          src="https://missionshikshansamvad.com/wp-content/uploads/2022/03/20181125_001507-1-150x150.png"
        />
        <Text style={styles.title}>राष्ट्रीय युवा दिवस</Text>
        <Image
          style={styles.logo}
          src="https://stillchemy.com/wp-content/uploads/2024/12/Swami-Vivekananda-Biography-1.jpg"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.nameField}>नाम: {name || '__________'}</Text>
        <Text style={styles.nameField}>विद्यालय: {schoolName || '__________'}</Text>
        <Text>
          "आज का दिन आपके लिए एक महत्वपूर्ण दिन है, क्योंकि आपने *राष्ट्रीय युवा दिवस*
          प्रतियोगिता में अपनी प्रतिभा का प्रदर्शन किया है। आपकी प्रतिभा और क्षमता को
          पहचानने और विकसित करने के लिए हमें गर्व है। हमें विश्वास है कि आप सभी अपने
          लक्ष्यों को प्राप्त करेंगे और देश के लिए कुछ अद्भुत करेंगे। मिशन शिक्षा संवाद
          आपके उज्ज्वल भविष्य की कामना करता है।"
        </Text>
      </View>

      <Text style={styles.footer}>दिनांक: {date || '__________'}</Text>
      <Text style={styles.watermark}>मिशन शिक्षा संवाद</Text>
    </Page>
  </Document>
);
