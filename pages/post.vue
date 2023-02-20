<template>
  <header>
    <Navbar></Navbar>
  </header>
  <main class="container">
    <div class="headings">
      <h1>{{ post.data().title }}</h1>
      <p>{{ authorName }} - {{ toJSDate(post.data().date) }}</p>
    </div>
    <md-editor v-model="contents" language="en-US" preview-only />
  </main>
</template>

<script setup>
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {toJSDate} from "~/utils/conversion";
import {doc, getDoc} from "firebase/firestore";
import Navbar from "~/components/navbar.vue";

const route = useRoute();

const db = useFirestore();

let postId = route.query.post ? route.query.post : 0;

const postRef = doc(db, "posts", postId)
const post = await getDoc(postRef)

const authorDoc = await getDoc(post.data().author)
const authorName = authorDoc.data().name

const contents = post.data().contents;


</script>

<style scoped>
main {
  padding-top: calc(var(--block-spacing-vertical))
}
</style>
