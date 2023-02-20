<template>
  <nav class="container-fluid">
    <ul>
      <li>
        <NuxtLink to="/"><b style="color: black">My Blog</b></NuxtLink>
      </li>
    </ul>
    <ul>
      <li>
        <a href="#" @click="changeModalState" class="outline">Search</a>
      </li>
      <li>
        <NuxtLink to="writer" v-if="loggedIn === true">My Posts</NuxtLink>
      </li>
      <li>
        <NuxtLink to="login" role="button" v-if="loggedIn === false">Login</NuxtLink>
        <a href="#" role="button" class="contrast" @click="logout" v-else>Logout</a>
      </li>
    </ul>
  </nav>
  <dialog :open=modalOpen>
    <article>
      <header>
        <b>Search</b>
        <a href="#" aria-label="Close" class="close" @click="changeModalState"></a>
      </header>
      <section>
        <input id="term" type="text" v-model="searchTerm">
        <ol v-if="searchResults.length !== 0">
          <li v-for="post in searchResults">
            <div class="headings">
              <h3>
                <NuxtLink :to="{path: 'post', query: {post: post.item.id}}" v-if="loggedIn === false">
                  {{ post.item.title }}
                </NuxtLink>
                <NuxtLink :to="{path: 'mdeditor', query: {post: post.item.id}}" v-else>
                  {{ post.item.title }}
                </NuxtLink>
              </h3>
              <h4>Last edited on {{ post.item.date }}</h4>
            </div>
          </li>
        </ol>
        <p v-else>No search results found..</p>
      </section>
      <footer>
        <a href="#" role="button" @click="search">Search</a>
      </footer>
    </article>
  </dialog>
</template>

<script setup>
import {signOut} from "firebase/auth";
import Fuse from 'fuse.js';

const loggedIn = ref(!!(await getCurrentUser()));

const modalOpen = ref(0);
const searchTerm = ref('');
const searchResults = ref([]);

const props = defineProps({
  posts: Array
})

const fuse = new Fuse(props.posts, {
  keys: ['title', 'content', 'date']
})

function search() {
  searchResults.value = fuse.search(searchTerm.value);
}

function changeModalState() {
  modalOpen.value = modalOpen.value !== true;
}

async function logout() {
  const auth = useFirebaseAuth();
  try {
    await signOut(auth);
    loggedIn.value = false;
    navigateTo({path: '/'})
  } catch (e) {
    alert(e.message);
  }
}
</script>

<style scoped>
nav {
  box-shadow: 1px 1px 0 0 #000000;
}
</style>
