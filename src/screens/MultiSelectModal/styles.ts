// styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '60%',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start', // Mudando para flex-start para as opções ficarem à esquerda
  },
  optionButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
    minWidth: 100, // Definindo uma largura mínima para cada opção
    maxWidth: '100%', // Definindo uma largura máxima para evitar que as opções se estendam além da largura da tela
  },
  selectedOptionButton: {
    backgroundColor: '#add8e6',
  },
});

export default styles;
