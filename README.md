# Mobile Development – Lesson 5
## Navigation, Hooks, and Platform-Specific Features

---

## Setup

For this lesson we are building **SpaceApp 🚀** — a multi-screen app that we will wire up three different ways using React Navigation.

```bash
npx create-expo-app spaceapp --template blank
cd spaceapp
```

> **Rule of thumb:** Always use `npx expo install` for everything. If a package isn't in Expo's compatibility table it falls back to the latest version anyway. One command, no version conflicts.

---

## File Structure

```
spaceapp/
  App.jsx
  screens/
    PlanetsScreen.jsx
    MissionsScreen.jsx
    CrewScreen.jsx
```

The screens are pre-written. Only `App.jsx` changes across all three navigation patterns.

---

## Section 1: Navigation

React Navigation is the standard navigation library for React Native. It gives you three main navigators — and we will build all three using the same screens.

### What is a Navigator?

A navigator is the system that manages your screens. It:
- Keeps track of which screen is visible
- Handles the back button and gestures
- Automatically passes a `navigation` prop to every registered screen

You never import or create `navigation` yourself — the navigator hands it to your screen through props:

```jsx
export default function PlanetsScreen({ navigation }) {
  // navigation is passed automatically by the navigator
}
```

`navigation` comes with methods your screens can call back to the navigator:
- `navigation.navigate('Planets')` — go to a screen
- `navigation.goBack()` — go back
- `navigation.setOptions({ tabBarBadge: null })` — update screen options from inside the component

---

### What is react-native-screens?

`react-native-screens` is a performance library that replaces React Navigation's JavaScript-managed screen stack with **native OS screen containers**. iOS and Android handle the screens using their own built-in primitives instead of React managing everything in memory.

You never write any code with it directly — React Navigation detects it and uses it automatically once installed.

---

### Navigator 1: Stack

Stack is the default mobile navigation pattern. Screens slide in on top of each other like a pile of cards. The back gesture pops the top card off.

**Install:**
```bash
npx expo install @react-navigation/native react-native-screens react-native-safe-area-context @react-navigation/native-stack
```

**App.jsx:**
```jsx
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PlanetsScreen from './screens/PlanetsScreen';
import MissionsScreen from './screens/MissionsScreen';
import CrewScreen from './screens/CrewScreen';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>🚀 SpaceApp</Text>
      <Text style={styles.subtitle}>Where do you want to go?</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Planets')}>
        <Text style={styles.buttonText}>🪐 Planets</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Missions')}>
        <Text style={styles.buttonText}>🚀 Missions</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Crew')}>
        <Text style={styles.buttonText}>👨‍🚀 Crew</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a1a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '800' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Planets" component={PlanetsScreen} />
        <Stack.Screen name="Missions" component={MissionsScreen} />
        <Stack.Screen name="Crew" component={CrewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#0a0a1a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 16,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#8888aa',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#14142b',
    width: '100%',
    padding: 20,
    borderRadius: 14,
    borderLeftWidth: 4,
    borderLeftColor: '#5b4fff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
```

> `TouchableOpacity` is just a button — it detects the tap and fires `onPress`. The `Stack.Navigator` is the engine that actually swaps screens. Without it, `navigation` doesn't exist and the button does nothing.

> `screenOptions` applies to all screens. `options` on a single `Stack.Screen` applies to just that screen.

---

### Navigator 2: Tabs

Tabs render a persistent bottom bar. Users switch between sections freely — no back button needed.

**Install:**
```bash
npm install @react-navigation/bottom-tabs
```

**App.jsx — replace Stack setup with this:**
```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import PlanetsScreen from './screens/PlanetsScreen';
import MissionsScreen from './screens/MissionsScreen';
import CrewScreen from './screens/CrewScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a1a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '800' },
          tabBarStyle: { backgroundColor: '#0a0a1a', borderTopColor: '#14142b' },
          tabBarActiveTintColor: '#5b4fff',
          tabBarInactiveTintColor: '#8888aa',
        }}
      >
        <Tab.Screen
          name="Planets"
          component={PlanetsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="planet" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Missions"
          component={MissionsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="rocket" size={size} color={color} />,
          }}
        />
        <Tab.Screen
          name="Crew"
          component={CrewScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
```

> `tabBarIcon` requires a function — the navigator calls it with `color` and `size` and switches `color` automatically between `tabBarActiveTintColor` and `tabBarInactiveTintColor`.

**Useful tab options:**

| Option | What it does |
|---|---|
| `tabBarIcon` | Icon for the tab |
| `tabBarLabel` | Custom text label |
| `tabBarBadge` | Red notification badge e.g. `tabBarBadge={3}` |
| `headerShown` | Show/hide the header |
| `headerRight` | Add a button to the right of the header |

**Clearing a badge from inside the screen:**
```jsx
import { useEffect } from 'react';

export default function MissionsScreen({ navigation }) {
  useEffect(() => {
    navigation.setOptions({ tabBarBadge: null });
  }, []);
}
```

---

### Navigator 3: Drawer

Drawer slides in a menu from the side. Good for apps with many sections or secondary pages that don't need to live in the tab bar.

**Install:**
```bash
npx expo install react-native-reanimated react-native-worklets react-native-gesture-handler
npm install @react-navigation/drawer
```

> No changes to `babel.config.js` needed on SDK 54+. `babel-preset-expo` handles Reanimated automatically.

> Always restart with `npx expo start --clear` after installing Reanimated.

**App.jsx — replace Tabs setup with this:**
```jsx
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import PlanetsScreen from './screens/PlanetsScreen';
import MissionsScreen from './screens/MissionsScreen';
import CrewScreen from './screens/CrewScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#0a0a1a' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: '800' },
          drawerStyle: { backgroundColor: '#0a0a1a' },
          drawerActiveTintColor: '#5b4fff',
          drawerInactiveTintColor: '#8888aa',
        }}
      >
        <Drawer.Screen name="Planets" component={PlanetsScreen} />
        <Drawer.Screen name="Missions" component={MissionsScreen} />
        <Drawer.Screen name="Crew" component={CrewScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
```

> The hamburger menu icon appears in the header automatically — you don't need to add it.

---

### Navigator Comparison

| Navigator | Mental model | When to use |
|---|---|---|
| **Stack** | Pile of cards, go deeper and come back | Detail screens, forms, flows |
| **Tabs** | Sections always visible at the bottom | Main app sections |
| **Drawer** | Hidden side menu | Many sections, secondary pages |

---

## Section 2: Hooks in React Native

### useWindowDimensions

Returns live screen `width` and `height`. Updates automatically when the device rotates — unlike `Dimensions.get('window')` which is a one-time snapshot.

```jsx
import { useWindowDimensions } from 'react-native'; // no install needed
```

**Practical example — responsive columns in PlanetsScreen:**
```jsx
const { width, height } = useWindowDimensions();
const isLandscape = width > height;
const columns = isLandscape ? 2 : 1;
const cardWidth = (width - 48) / columns;

<FlatList
  key={columns}           // forces FlatList to re-render when columns change
  numColumns={columns}
  ...
/>
```

> `key={columns}` on FlatList is required — without it, React Native won't re-render when `numColumns` changes and you'll get an error.

> **Expo Go limitation:** Orientation changes may not trigger re-renders in Expo Go on iOS. Works correctly on a real device with rotation lock off and `"orientation": "default"` set in `app.json`.

---

### useColorScheme

Returns `'light'` or `'dark'` based on the device's system appearance setting.

```jsx
import { useColorScheme } from 'react-native'; // no install needed
```

**Pattern — two theme objects:**
```jsx
const darkTheme = {
  screen: '#0a0a1a',
  card: '#14142b',
  heading: '#ffffff',
  text: '#aaaacc',
};

const lightTheme = {
  screen: '#f0f0f5',
  card: '#ffffff',
  heading: '#0a0a1a',
  text: '#444466',
};

const getStyles = (theme) => StyleSheet.create({
  screen: { flex: 1, backgroundColor: theme.screen },
  card: { backgroundColor: theme.card, borderRadius: 14, padding: 16 },
  heading: { fontSize: 28, fontWeight: '800', color: theme.heading },
});

export default function MissionsScreen() {
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? darkTheme : lightTheme;
  const styles = getStyles(theme);

  return (/* ... */);
}
```

> Static styles (font sizes, padding, border radius) stay in `StyleSheet`. Only colors come from the theme.

> **Expo Go limitation:** `useColorScheme` may not respond to system changes in Expo Go. For demos, hardcode the scheme: `const scheme = 'light'` and swap manually to show both themes.

> Change system appearance on iPhone: **Settings → Display & Brightness → Light/Dark**

---

## Section 3: iOS Specifics (if time permits)

Always wrap iOS-only APIs in a platform check — they will crash on Android without it:

```jsx
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  // iOS only code here
}
```

### ActionSheetIOS

A native iOS bottom sheet with a list of options. Slides up from the bottom — the standard iOS pattern for actions like Delete, Share, or Edit.

```jsx
import { ActionSheetIOS } from 'react-native';

ActionSheetIOS.showActionSheetWithOptions(
  {
    options: ['Cancel', 'Set as Favourite', 'View Fact'],
    cancelButtonIndex: 0,       // shown as Cancel
    destructiveButtonIndex: 1,  // shown in red — use for irreversible actions
  },
  (buttonIndex) => {
    if (buttonIndex === 1) console.log('Set as Favourite');
    if (buttonIndex === 2) console.log('View Fact');
  }
);
```

> Always provide an Android fallback using `Alert` so the app doesn't crash on Android.

---

### Settings

iOS-only persistent key/value store. Data survives closing and reopening the app.

```jsx
import { Settings } from 'react-native';

Settings.set({ favourite: 'Neil Armstrong' });  // write
const name = Settings.get('favourite');          // read → 'Neil Armstrong'
```

| | Survives app reopen? |
|---|---|
| `useState` | ❌ Gone when app closes |
| `Settings` | ✅ Persists on device (iOS only) |

> For cross-platform persistent storage use `AsyncStorage` (covered in a future lesson).

---

## Section 4: Android Specifics (if time permits)

Always wrap Android-only APIs in a platform check — they will crash on iOS without it:

```jsx
if (Platform.OS === 'android') {
  // Android only code here
}
```

### BackHandler

Intercepts the Android hardware back button. Return `true` to handle the event yourself — return `false` to let the default back behaviour run.

```jsx
import { BackHandler } from 'react-native'; // no install needed
import { useEffect } from 'react';

useEffect(() => {
  if (Platform.OS !== 'android') return;

  const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
    Alert.alert('Leave?', 'Are you sure you want to go back?', [
      { text: 'Stay', style: 'cancel' },
      { text: 'Leave', onPress: () => BackHandler.exitApp() },
    ]);
    return true; // prevents default back behaviour
  });

  return () => subscription.remove(); // always clean up on unmount
}, []);
```

---

### ToastAndroid

A lightweight Android-only popup that auto-dismisses. No buttons, no user input.

```jsx
import { ToastAndroid } from 'react-native'; // no install needed

ToastAndroid.show('Missions refreshed!', ToastAndroid.SHORT); // ~2 seconds
ToastAndroid.show('Changes saved.', ToastAndroid.LONG);       // ~3.5 seconds
```

**Cross-platform alternative:** `react-native-root-toast` — works on both iOS and Android with the same API.

```bash
npm install react-native-root-toast
```

```jsx
import Toast from 'react-native-root-toast';
Toast.show('Item saved!', { duration: Toast.durations.SHORT });
```

---

## Quick Reference

| Feature | Package | iOS | Android | Expo Go |
|---|---|---|---|---|
| Stack Navigator | `@react-navigation/native-stack` | ✅ | ✅ | ✅ |
| Tab Navigator | `@react-navigation/bottom-tabs` | ✅ | ✅ | ✅ |
| Drawer Navigator | `@react-navigation/drawer` | ✅ | ✅ | ✅ |
| `useWindowDimensions` | built-in | ✅ | ✅ | ⚠️ rotation limited |
| `useColorScheme` | built-in | ✅ | ✅ | ⚠️ hardcode for demo |
| `ActionSheetIOS` | built-in | ✅ | ❌ | ✅ |
| `Settings` | built-in | ✅ | ❌ | ⚠️ may not persist |
| `BackHandler` | built-in | ❌ | ✅ | ✅ |
| `ToastAndroid` | built-in | ❌ | ✅ | ✅ |
