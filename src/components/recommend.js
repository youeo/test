import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function Recommend() {

    const [showModal, setShowModal] = useState(true);
    const [activeTab, setActiveTab] = useState('possible');

    // const filteredRecipes = recipes.filter(recipe =>
    //     activeTab === 'possible' ? recipe.available : !recipe.available
    // );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
        <View style={styles.thumbnail} />
        <View style={styles.cardContent}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.description}>{item.description}</Text>
        </View>
        <AntDesign name="right" size={16} color="gray" />
        </View>
    );

    return (
        <Modal visible={showModal} animationType="slide" transparent={false}>
        <View style={styles.container}>
            {/* 헤더 */}
            <View style={[styles.header, {backgroundColor: 'gray', flex: 0.1}]}>
            <TouchableOpacity onPress={false}>
                <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>
            </View>

            {/* 탭 메뉴 */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'possible' && styles.activeTab]}
                    onPress={() => setActiveTab('possible')}
                >
                    <Text>현재 가능한 레시피</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'needs' && styles.activeTab]}
                    onPress={() => setActiveTab('needs')}
                >
                    <Text>추가 재료가 필요한 레시피</Text>
                </TouchableOpacity>
            </View>

            {/* 정렬 */}
            <TouchableOpacity style={styles.sort}>
            <Text>정렬기준 <AntDesign name="caretdown" size={12} /></Text>
            </TouchableOpacity>

            {/* 레시피 리스트 */}
            {/* <FlatList
            data={filteredRecipes}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            renderItem={renderItem}
            contentContainerStyle={{ padding: 10 }}
            /> */}
        </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1},
    header: {
      flexDirection: 'row', alignItems: 'center',
      padding: 16, borderBottomWidth: 1, borderColor: '#ddd',
    },
    headerTitle: { fontSize: 18, marginLeft: 10, fontWeight: 'bold' },
    tabs: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#f0f0f0',
      paddingVertical: 10,
    },
    tab: {
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 20,
      backgroundColor: '#e0e0e0',
    },
    activeTab: {
      backgroundColor: '#fff',
      borderBottomWidth: 2,
      borderColor: '#000',
    },
    sort: {
      alignSelf: 'flex-end',
      padding: 10,
      marginRight: 16,
    },
    card: {
      flexDirection: 'row',
      backgroundColor: '#fafafa',
      padding: 16,
      borderRadius: 10,
      marginBottom: 10,
      alignItems: 'center',
    },
    thumbnail: {
      width: 50, height: 50,
      borderRadius: 25,
      backgroundColor: '#ccc',
      marginRight: 10,
    },
    cardContent: {
      flex: 1,
    },
    title: { fontSize: 16, fontWeight: 'bold' },
    description: { fontSize: 12, color: '#666' },
  });
  
