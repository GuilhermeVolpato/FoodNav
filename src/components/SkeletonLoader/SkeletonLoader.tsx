import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkeletonLoader = () => {
  return (
    <View style={styles.skeletonContainer}>
      <View style={styles.skeletonImage} />
      <View style={styles.skeletonDetails}>
        <View style={styles.skeletonText} />
        <View style={[styles.skeletonTextSmall, { marginTop: 10 }]} />
        <View style={[styles.skeletonTextSmall, { marginTop: 5 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    flexDirection: "row",
    alignItems: "center", // Ajusta os itens verticalmente
    width: "100%",
    marginBottom: 10,
    backgroundColor: "#62626231",
    padding: 10, // Adiciona um pouco de padding ao redor
  },
  skeletonImage: {
    width: 100,
    borderRadius: 10,
    height: 120,
    backgroundColor: '#e1e1e1',
    marginRight: 15, // Adiciona margem à direita para separar da área de detalhes
  },
  skeletonDetails: {
    flex: 1,
    justifyContent: 'space-around',
  },
  skeletonText: {
    height: 20,
    backgroundColor: '#e1e1e1',
    width: '70%',
  },
  skeletonTextSmall: {
    height: 15,
    backgroundColor: '#e1e1e1',
    width: '60%',
  },
});

export default SkeletonLoader;