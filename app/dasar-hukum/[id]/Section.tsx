'use client'
import UnderMaintenance from '@/app/component/UnderMaintenance';
import { DasarHukumResponse } from '@/app/Model/dasarHukum.model';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFRenderer, PDFDownloadLink } from '@react-pdf/renderer';

interface Props {
    id: string;
}

const Section: React.FC<Props> = ({ id }) => {
    const API_URL = process.env.API_URL
    const [data, setData] = useState<DasarHukumResponse>()

    const getData = async () => {
        try {
            const response = await axios.get(`${API_URL}/dasar-hukum?id=${id}`)

            if (response.data.success == true) {
                setData(response.data.data)
            }
        } catch (error) {

        }
    }

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'row',
            backgroundColor: '#E4E4E4',
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
    });

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text>Section #1</Text>
                </View>
                <View style={styles.section}>
                    <Text>Section #2</Text>
                </View>
            </Page>
        </Document>
    );

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            {/* <UnderMaintenance /> */}
            <div className="flex justify-center p-4">
                <div className="lg:w-[80%] w-[100%]">
                    <Iframe url={data && data.file ? data.file : '#'}
                        id=""
                        className="w-full h-[80vh]"
                        // display="block"
                        // position="relative"
                        scrolling='no'
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    )
}

export default Section