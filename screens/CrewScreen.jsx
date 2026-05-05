import { View, Text, StyleSheet, FlatList } from 'react-native';

const crew = [
  {
    id: '1',
    name: 'Neil Armstrong',
    role: 'Commander',
    missions: 'Gemini 8, Apollo 11',
    fact: 'First human to walk on the Moon, July 20 1969.',
    emoji: '👨‍🚀',
  },
  {
    id: '2',
    name: 'Sally Ride',
    role: 'Mission Specialist',
    missions: 'STS-7, STS-41-G',
    fact: 'First American woman in space, 1983.',
    emoji: '👩‍🚀',
  },
  {
    id: '3',
    name: 'Yuri Gagarin',
    role: 'Pilot',
    missions: 'Vostok 1',
    fact: 'First human in space, April 12 1961.',
    emoji: '🧑‍🚀',
  },
  {
    id: '4',
    name: 'Mae Jemison',
    role: 'Mission Specialist',
    missions: 'STS-47',
    fact: 'First African American woman in space, 1992.',
    emoji: '👩‍🚀',
  },
  {
    id: '5',
    name: 'Chris Hadfield',
    role: 'Commander',
    missions: 'STS-74, STS-100, Soyuz TMA-07M',
    fact: 'First Canadian to walk in space. Famous for his ISS music videos.',
    emoji: '👨‍🚀',
  },
];

export default function CrewScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>👨‍🚀 Crew</Text>

      <FlatList
        data={crew}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.avatar}>{item.emoji}</Text>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.role}>{item.role}</Text>
              <Text style={styles.missions}>🚀 {item.missions}</Text>
              <Text style={styles.fact}>{item.fact}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 16,
    marginTop: 8,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#14142b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    gap: 14,
  },
  avatar: {
    fontSize: 40,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#fff',
  },
  role: {
    fontSize: 13,
    color: '#5b4fff',
    fontWeight: '600',
    marginTop: 2,
  },
  missions: {
    fontSize: 12,
    color: '#8888aa',
    marginTop: 4,
  },
  fact: {
    fontSize: 13,
    color: '#aaaacc',
    marginTop: 6,
    lineHeight: 18,
  },
});
