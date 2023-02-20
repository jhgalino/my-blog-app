<template>
  <header>
    <nav class="container-fluid">
      <ul>
        <li>
          <NuxtLink to="writer">&lt; My Posts</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
  <main class="container">
    <section>
      <form>
        <div>
          <label for="title">
            Title
            <input id="title" type="text" v-model="title">
          </label>
        </div>
        <br>
      </form>
    </section>
    <section>
      <md-editor v-model="content" language="en-US" @onSave="save" preview-theme="vuepress"/>
    </section>
    <section>
      <button style="float: right" @click="save">Save!</button>
    </section>

  </main>

</template>

<script setup>
import {doc, getDoc, setDoc, addDoc, collection, Timestamp} from "firebase/firestore";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const route = useRoute();
const db = useFirestore();

let postId = route.query.post;

const postRef = doc(db, "posts", postId);
const post = await getDoc(postRef);

const content = ref('');
const title = ref('');

if (post.exists()) {
  content.value = post.data().contents;
  title.value = post.data().title;
}

async function save() {
  const currentUser = await getCurrentUser();
  const authorRef = await doc(db, "authors", currentUser.uid);
  if (postId !== '0') {
    await setDoc(postRef, {
      contents: content.value,
      title: title.value,
      date: Timestamp.fromDate(new Date(Date.now())),
    }, {merge: true});
  } else {
    await addDoc(collection(db, "posts"), {
      contents: content.value,
      title: title.value,
      date: Timestamp.fromDate(new Date(Date.now())),
      author: authorRef
    })
  }

  alert('Saved!');
  navigateTo({path: 'writer', query: {uid: currentUser.uid}});
}

</script>

<style scoped>
</style>
