<template>
  <header>
    <Navbar :posts="posts"></Navbar>
  </header>

  <main class="container">
    <h1>My Posts</h1>
    <NuxtLink :to="{path: 'mdeditor', query: {post: 0}}">
      Create new...
    </NuxtLink>
    <ol>
      <li v-for="post in userPosts">
        <div class="headings">
          <h3>
            <NuxtLink :to="{path: 'mdeditor', query: {post: post.id}}">
              {{ post.data().title }}
            </NuxtLink>
          </h3>
          <h4>Last edited on {{ toJSDate(post.data().date) }}</h4>
        </div>
      </li>
    </ol>
  </main>


</template>

<script setup>
import {doc, query, where, collection, getDocs} from 'firebase/firestore';

const db = useFirestore();
const currentUser = await getCurrentUser();

const userRef = doc(db, 'authors', currentUser.uid);
const q = query(
    collection(db, "posts"),
    where("author", "==", userRef)
);

const userPostsRef = await getDocs(q);
const userPosts = userPostsRef.docs
    .map((doc) => doc)
    .sort((a, b) => b.data().date.seconds - a.data().date.seconds);

const posts = userPostsRef.docs.map((doc) => {
  return {id: doc.id, title: doc.data().title, content: doc.data().contents, date: toJSDate(doc.data().date)};
});

</script>

<style scoped>
main {
  padding-top: calc(var(--block-spacing-vertical))
}
</style>
