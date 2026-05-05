import { View, Text, StyleSheet, FlatList } from 'react-native';

const missions = [
  {
    id: '1',
    name: 'Apollo 11',
    year: '1969',
    status: 'Completed',
    description: 'First crewed lunar landing. Neil Armstrong and Buzz Aldrin walked on the Moon.',
    emoji: '🌕',
  },
  {
    id: '2',
    name: 'Mars Rover – Perseverance',
    year: '2021',
    status: 'Active',
    description: 'Searching for signs of ancient microbial life on the surface of Mars.',
    emoji: '🔴',
  },
  {
    id: '3',
    name: 'Artemis I',
    year: '2022',
    status: 'Completed',
    description: 'Uncrewed test flight of the Orion capsule around the Moon and back.',
    emoji: '🚀',
  },
  {
    id: '4',
    name: 'James Webb Telescope',
    year: '2021',
    status: 'Active',
    description: 'Observing the universe in infrared — looking back over 13 billion years.',
    emoji: '🔭',
  },
  {
    id: '5',
    name: 'Voyager 1',
    year: '1977',
    status: 'Active',
    description: 'The farthest human-made object from Earth, now in interstellar space.',
    emoji: '🛸',
  },
];

const statusColor = {
  Active: '#4ade80',
  Completed: '#8888aa',
};

export default function MissionsScreen() {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>🚀 Missions</Text>

      <FlatList
        data={missions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <View style={styles.cardMeta}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardYear}>{item.year}</Text>
              </View>
              <Text style={[styles.badge, { color: statusColor[item.status] }]}>
                {item.status}
              </Text>
            </View>
            <Text style={styles.cardDesc}>{item.description}</Text>
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
    backgroundColor: '#14142b',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardMeta: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
  cardYear: {
    fontSize: 12,
    color: '#8888aa',
    marginTop: 2,
  },
  badge: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardDesc: {
    fontSize: 13,
    color: '#aaaacc',
    lineHeight: 20,
  },
});
