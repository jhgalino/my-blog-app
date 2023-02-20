<template>
  <header>
    <Navbar :posts="posts"></Navbar>
  </header>

  <main class="container">
    <section>
      <ol>
        <li v-for="post in index_Posts">
          <div class="headings">
            <h3>
              <NuxtLink :to="{path: 'post', query: {post: post.id}}">
                {{ post.data().title }}
              </NuxtLink>
            </h3>
            <h4>Last edited on {{ toJSDate(post.data().date) }}</h4>
          </div>
        </li>
      </ol>
      <div></div>
    </section>
  </main>

</template>

<script setup>
import {collection, getDocs} from "firebase/firestore";
import Navbar from "~/components/navbar.vue";

const db = useFirestore();

const postsRef = await getDocs(collection(db, 'posts'));
const index_Posts = postsRef.docs
    .map((doc) => doc)
    .sort((a, b) => b.data().date.seconds - a.data().date.seconds);

const posts = postsRef.docs.map((doc) => {
  return {id: doc.id, title: doc.data().title, content: doc.data().contents, date: toJSDate(doc.data().date)};
});
</script>

<style scoped>
main {
  padding-top: calc(var(--block-spacing-vertical))
}
</style>
