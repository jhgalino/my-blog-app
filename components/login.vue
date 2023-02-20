<template>
  <article>
    <form>
      <h1>{{ firstTime ? 'Sign up' : 'Log in' }}</h1>
      <div v-if="firstTime">
        <label for="username">
          Name
          <input id="username" type="text" v-model="name" required>
        </label>
      </div>
      <div class="grid">
        <label for="email">
          Email
          <input id="email" type="text" v-model="email" required>
        </label>
        <label for="password">
          Password
          <input id="password" type="password" v-model="password" required>
        </label>
      </div>
      <br>
      <NuxtLink :to="{path: 'signup'}" v-if="!firstTime">Sign up instead...</NuxtLink>
      <NuxtLink :to="{path: 'login'}" v-else>Log in instead...</NuxtLink>
      <button @click.prevent="signUp" :aria-busy="`${loading}`" v-if="firstTime" >Sign up</button>
      <button @click.prevent="logIn" :aria-busy="`${loading}`" v-else>Log in</button>
    </form>
  </article>

</template>

<script setup>
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {doc, setDoc} from "firebase/firestore";

const auth = useFirebaseAuth();
const db = useFirestore();

const email = ref('');
const password = ref('')
const name = ref('')
let loading = ref(false);

const props = defineProps({
  firstTime: Boolean
})

async function signUp() {
  loading.value = true;
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    const currentUser = await getCurrentUser();

    if (currentUser) {
      await setDoc(doc(db, "authors", currentUser.uid), {
        name: name.value
      });
      navigateTo({path: 'writer', query: {uid: currentUser.uid}})
    } else {
      alert('currentUser cannot be found')
    }

  } catch (error) {
    alert(error.message)
  }
  loading.value = false;
}

async function logIn() {
  loading.value = true;
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);
    const currentUser = await getCurrentUser();

    if (currentUser) {
      navigateTo({path: 'writer', query: {uid: currentUser.uid}})
    } else {
      alert('currentUser not found')
    }

  } catch (error) {
    alert(error.message)
  }
  loading.value = false;
}

</script>

<style scoped>

</style>
