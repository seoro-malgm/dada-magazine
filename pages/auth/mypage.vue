<template>
  <b-container>
    <article>
      <template v-if="pending.submit">
        <loading />
      </template>
      <template v-else>
        <b-row align-h="center" class="w-100">
          <b-col cols="12" md="7" xl="5">
            <b-card class="w-100">
              <b-card-header
                header-bg-variant="white"
                header-border-variant="white"
                header-tag="header"
              >
                <b-card-title title-tag="h1" class="text-center">
                  내 정보
                </b-card-title>
              </b-card-header>
              <b-card-body>
                <ul class="list-unstyled">
                  <li class="mb-4">
                    <h6 class="mb-2">프로필 이미지</h6>
                    <label for="profile_image" class="input-profile_image">
                      <template v-if="pending.profile_image_url">
                        <div class="label-text">
                          <b-spinner />
                        </div>
                      </template>
                      <template v-else-if="!pending.profile_image_url">
                        <template v-if="input.profile_image_url">
                          <b-avatar
                            size="6rem"
                            :src="input.profile_image_url"
                            alt="새 썸네일"
                          />
                        </template>
                        <template v-else>
                          <b-avatar size="6rem"></b-avatar>
                        </template>
                      </template>
                    </label>
                    <input
                      type="file"
                      id="profile_image"
                      @change="uploadProfile_image"
                      accept=".png, .jpg, .jpeg, .gif"
                      class="d-none"
                    />
                  </li>
                  <li class="mb-4">
                    <h6 class="mb-2">이메일</h6>
                    <span>{{ auth?.email }}</span>
                  </li>
                  <li class="mb-4">
                    <h6 class="mb-2">별명</h6>
                    <b-form-group
                      :state="validate.nickname"
                      invalid-feedback="8자 이하의 한글, 영문, 숫자로 조합 가능합니다"
                    >
                      <b-form-input
                        v-model="input.nickname"
                        placeholder="새 별명을 입력해주세요."
                      />
                    </b-form-group>
                  </li>
                </ul>
              </b-card-body>
              <b-card-footer class="bg-white border-0 pt-0">
                <b-btn
                  variant="primary w-100 py-2"
                  @click="submit"
                  pill
                  :disabled="Object.values(validate).includes(false)"
                >
                  <span class="text-1"> 정보 저장하기</span>
                </b-btn>
              </b-card-footer>
            </b-card>
            <div
              class="d-flex flex-column flex-lg-row justify-content-between my-3"
            >
              <b-btn variant="link p-0 text-light text-1" @click="onRemoveUser"
                >회원 탈퇴하기</b-btn
              >
              <b-btn variant="alert px-3" pill :to="{ name: 'auth-logout' }"
                >로그아웃</b-btn
              >
            </div>
          </b-col>
        </b-row>
      </template>
      <!-- <pre>
      user: {{ user }}
      <br>
      input: {{ input }}
    </pre> -->
    </article>
  </b-container>
</template>

<script>
import { resize } from "~/plugins/commons.js";
export default {
  name: "auth-mypage",
  head() {
    return {
      title: `신물결 | 마이페이지`,
    };
  },
  props: {
    auth: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pending: {
        profile_image: false,
        submit: false,
      },
      input: {
        profile_image: null,
        profile_image_url: null,
        nickname: null,
      },
      resize,
    };
  },
  computed: {
    validate() {
      const nicknameRegex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
      const nickname =
        nicknameRegex.test(this.input.nickname) &&
        String(this.input.nickname).length <= 8;
      return {
        nickname,
      };
    },
  },

  mounted() {
    if (this.auth) {
      this.input = {
        ...this.auth,
      };
    }
  },
  methods: {
    // 프로필 업로드
    async uploadProfile_image(e) {
      const { getImageURL, deleteImage } = this.$firebase();
      const file = e.target.files[0];
      if (!file) return;
      // pending 시작
      this.pending.profile = true;
      // 이미 올린 썸네일이 있으면 그건 삭제함
      if (this.input.profile_image) {
        deleteImage(`profile/${this.input.profile_image_url}`);
      }
      // 초기화
      this.input.profile_image_url = null;
      const type = file?.type.split("/").at(-1);
      const fileName = `profile_${new Date().valueOf()}.${type}`;
      // 가로 200으로 리사이징하여 url 적용함
      this.resize.photo("w", file, 240, "object", async (result) => {
        const uploadedFile = await getImageURL(
          result.blob,
          result.blob.type,
          "profile",
          fileName
        );
        if (uploadedFile?.url) {
          console.log("uploadedFile:", uploadedFile);
          this.input.profile_image = uploadedFile.name;
          this.input.profile_image_url = uploadedFile.url;
          this.pending.profile = false;
        }
      });
    },
    // 정보 업데이트
    async submit() {
      this.pending.submit = true;
      const { setUserInfo } = this.$firebase();
      try {
        const data = await setUserInfo(this.input);
        console.log("data:", data);
        if (data) {
          window.toast("유저정보가 업데이트 되었습니다.");
          this.pending.submit = true;
          this.$router.push("/");
        }
      } catch (error) {
        window.toast("유저정보가 업데이트에 실패했습니다.");
        this.pending.submit = false;
      }
      this.pending.submit = false;
    },
    // 회원삭제
    async onRemoveUser() {
      window.toast("죄송합니다. 현재 기능 준비중입니다.");
    },
  },
};
</script>

<style lang="scss" scoped></style>
