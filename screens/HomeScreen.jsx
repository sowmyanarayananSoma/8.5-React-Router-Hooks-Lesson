import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>🚀 SpaceApp</Text>
      <Text style={styles.subtitle}>Where do you want to go?</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#8888aa',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#5b4fff',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
