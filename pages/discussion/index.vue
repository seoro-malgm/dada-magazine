<template>
  <div>
    <b-container fluid>
      <header class="text-center">
        <span>{{ discussion.no }}번째 토론</span>
        <h1 class="text-center text-3">{{ discussion.title }}</h1>
      </header>
      <!-- 논제 -->
      <section class="discussion-description">
        <b-row align-h="center">
          <b-col cols="10" md="8" lg="6">
            <p>
              {{ discussion.description }}
            </p>
          </b-col>
        </b-row>
      </section>
      <!-- 결과 -->
      <section class="flow-wrapper">
        <div class="versus-text">
          <h4>
            {{ discussion.versus.left.text }}
          </h4>
          <h4 class="text-right">
            {{ discussion.versus.right.text }}
          </h4>
        </div>
        <section class="flow-container">
          <div
            class="versus versus-left"
            :class="{
              win: discussion.versus.left.rate > discussion.versus.right.rate,
            }"
            :style="{
              width: `${discussion.versus.left.rate - 1.5}%`,
            }"
          ></div>
          <div class="versus versus-center"></div>
          <div
            class="versus versus-right"
            :class="{
              win: discussion.versus.right.rate > discussion.versus.left.rate,
            }"
            :style="{
              width: `${discussion.versus.right.rate - 1.5}%`,
            }"
          ></div>
        </section>
        <section class="versus-rate">
          <div
            class="rate-text left"
            :class="{
              win: discussion.versus.left.rate > discussion.versus.right.rate,
            }"
          >
            {{ discussion.versus.left.rate }} %
          </div>
          <div
            class="rate-text right"
            :class="{
              win: discussion.versus.right.rate > discussion.versus.left.rate,
            }"
          >
            {{ discussion.versus.right.rate }} %
          </div>
        </section>
      </section>
    </b-container>
    <!-- 대화창 -->
    <b-container tag="section" class="my-5 pt-5">
      <header class="text-center">
        <h3 class="bg-flow text-3">
          대화해보기
          <svg-line-path />
        </h3>
      </header>
      <article class="mt-3 mb-5 py-3 border-bottom">
        <ul class="reply-list">
          <li>댓글1</li>
        </ul>
        <section class="mt-3">
          <b-row align-v="stretch" class="mx-n1">
            <b-col cols="11" class="px-1">
              <b-textarea class="border" placeholder="새 댓글" />
            </b-col>
            <b-col cols="1" class="px-1">
              <b-btn variant="primary w-100 h-100">등록</b-btn>
            </b-col>
          </b-row>
        </section>
      </article>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      discussion: {
        no: 1,
        title: "AI는 도구가 될까요?",
        description:
          " Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium ullam totam aperiam ipsam ipsa officia qui minus unde quam? Atque fuga facilis et ducimus cumque iste commodi quos quibusdam architecto voluptatem dignissimos recusandae quasi quo reiciendis dolorum ab, veritatis dolor. Dolorum mollitia ipsum, quas quasi amet saepe possimus, ratione vel eveniet nobis suscipit iure, autem natus veniam sequi nam qui error? Ad ea debitis similique dolores nesciunt minima molestias ratione sequi reiciendis sed hic, ex dolore in explicabo enim velit autem voluptas culpa quis asperiores exercitationem paria",
        versus: {
          left: {
            text: "직업을 뺏길 뿐이다. 도입해서는 안 된다.",
            rate: 72.3,
          },
          right: {
            text: "도구로써 충분히 쓰일 수 있으므로 적극 도입해야 한다.",
            rate: 27.7,
          },
        },
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.discussion-description {
  margin: 1rem 0 2rem;
  p {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #444;
  }
}
.flow-wrapper {
  margin-top: 6rem;
  margin-bottom: 6rem;
  padding: 3rem 0;

  .versus-text {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 12px;
    h4 {
      font-size: 40px;
      max-width: 35%;
      word-break: keep-all;
    }
  }
  .versus-rate {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .rate-text {
      font-weight: 700;
      font-size: 32px;
      color: #999;
      &.win {
        font-size: 56px;
        color: $darkest;
      }
    }
  }
  .flow-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .versus {
      min-width: 3%;
      height: 80px;
      background-color: #999;
      &.versus-center {
        background-color: #ededed;
      }
      &.win {
        background-color: $primary;
      }
    }
  }
}
</style>
