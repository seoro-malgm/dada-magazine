<template>
  <b-container>
    <article class="my-5">
      <b-row align-h="center" class="w-100">
        <b-col cols="12" md="7">
          <template v-if="pending.init">
            <Loading />
          </template>
          <template v-else>
            <b-card class="w-100">
              <b-card-header
                header-bg-variant="white"
                header-border-variant="white"
                header-tag="header"
              >
                <b-card-title
                  title-tag="h2"
                  class="text-center text-20 text-lg-24"
                >
                  나의 프로필
                </b-card-title>
              </b-card-header>
              <b-card-body>
                <ul class="list-unstyled">
                  <li class="mb-4 text-center">
                    <div class="mb-3">
                      <h6
                        class="border border-primary rounded-pill px-3 py-1 d-inline-block"
                      >
                        프로필 이미지
                      </h6>
                    </div>
                    <label
                      for="profile_image"
                      class="input-profile_image cursor-pointer"
                    >
                      <template v-if="pending.profile_image_url">
                        <div class="label-text">
                          <b-spinner />
                        </div>
                      </template>
                      <template v-else-if="!pending.profile_image_url">
                        <template v-if="input.profile_image_url">
                          <b-avatar
                            size="10rem"
                            :src="input.profile_image_url"
                            alt="프로필 이미지"
                          />
                        </template>
                        <template v-else>
                          <b-avatar size="6rem" />
                        </template>
                      </template>
                      <div class="icon-wrap">
                        <i
                          class="icon icon-file-image m-auto text-20 text-md-24"
                        />
                      </div>
                    </label>
                    <input
                      type="file"
                      id="profile_image"
                      @change="uploadProfile_image"
                      accept=".png, .jpg, .jpeg, .gif"
                      class="d-none"
                      ref="profile_image_attached"
                    />
                  </li>

                  <li class="mb-4 d-flex flex-column">
                    <div class="mb-2">
                      <h6
                        class="border border-primary rounded-pill px-3 py-1 d-inline-block"
                      >
                        프로필 아이디
                      </h6>
                    </div>
                    <b-form-group>
                      <b-form-input
                        id="pid"
                        type="text"
                        v-model="input.pid"
                        @input="checkUser('pid', input.pid)"
                        placeholder="아이디를 입력하세요"
                        :state="state.pid"
                      />
                      <b-form-invalid-feedback>
                        <span class="text-14 text-lg-15 fw-700 text-alert">
                          <i class="icon icon-window-close" />
                          사용할 수 없는 아이디입니다
                        </span>
                        <small class="d-block text-alert">
                          2~15자, 영문, 언더바(_)사용가능
                        </small>
                      </b-form-invalid-feedback>
                      <template v-if="state.pid">
                        <template v-if="pending.pid">
                          <span>
                            <b-spinner small /> 중복된 아이디인지
                            검사중입니다...
                          </span>
                        </template>
                        <template v-else>
                          <span
                            class="text-14 text-lg-15 fw-700"
                            :class="`text-${check.pid ? 'info' : 'alert'}`"
                            v-if="typeof check.pid === 'boolean'"
                          >
                            <i
                              :class="`icon icon-${
                                check.pid ? 'check' : 'window-close'
                              }`"
                            />
                            <template v-if="check.pid === true">
                              사용가능한 아이디입니다
                            </template>
                            <template v-if="check.pid === false">
                              중복된 아이디입니다.
                            </template>
                          </span>
                        </template>
                      </template>
                    </b-form-group>
                  </li>
                  <li class="mb-4 d-flex flex-column">
                    <div class="mb-2">
                      <h6
                        class="border border-primary rounded-pill px-3 py-1 d-inline-block"
                      >
                        별명
                      </h6>
                    </div>
                    <b-form-group :state="state.nickname">
                      <b-form-input
                        id="nickname"
                        type="text"
                        v-model="input.nickname"
                        @input="checkUser('nickname', input.nickname)"
                        placeholder="별명을 입력하세요"
                        :state="state.nickname"
                      />
                      <b-form-invalid-feedback>
                        <span class="text-14 text-lg-15 fw-700 text-alert">
                          <i class="icon icon-window-close" />
                          사용할 수 없는 별명입니다
                        </span>
                        <small class="d-block text-alert">
                          2~15자 한/영조합
                        </small>
                      </b-form-invalid-feedback>
                      <template v-if="state.nickname">
                        <template v-if="pending.nickname">
                          <span>
                            <b-spinner small /> 중복된 별명인지 검사중입니다...
                          </span>
                        </template>
                        <template v-else>
                          <span
                            class="text-14 text-lg-15 fw-700"
                            :class="`text-${check.nickname ? 'info' : 'alert'}`"
                            v-if="typeof check.nickname === 'boolean'"
                          >
                            <i
                              :class="`icon icon-${
                                check.nickname ? 'check' : 'window-close'
                              }`"
                            />
                            <template v-if="check.nickname === true">
                              사용가능한 별명입니다
                            </template>
                            <template v-if="check.nickname === false">
                              중복된 아이디입니다.
                            </template>
                          </span>
                        </template>
                      </template>
                    </b-form-group>
                  </li>
                  <li class="mb-4 d-flex flex-column">
                    <div class="mb-2">
                      <h6
                        class="border border-primary rounded-pill px-3 py-1 d-inline-block"
                      >
                        자기소개
                      </h6>
                    </div>
                    <b-form-group>
                      <b-form-textarea
                        id="introduction"
                        class="border"
                        v-model="input.introduction"
                        placeholder="자기소개를 입력하세요"
                        :state="state.introduction"
                        rows="5"
                      />
                      <b-form-invalid-feedback>
                        자기소개는 50자 미만으로만 작성 가능합니다.
                      </b-form-invalid-feedback>
                    </b-form-group>
                  </li>
                </ul>
                <hr class="my-5" />
                <div>
                  <header class="mb-3 text-center">
                    <h2 class="text-center text-20 text-lg-24">제안받기</h2>
                    <span class="text-14 text-md-16">
                      에디터로서 제안을 받을 수있는 이메일, 연락처 등의 정보를
                      관리하세요.
                    </span>
                  </header>
                  <ul>
                    <li class="mb-4 d-flex flex-column">
                      <div class="mb-2">
                        <h6
                          class="border border-primary rounded-pill px-3 py-1 d-inline-block"
                        >
                          이메일
                        </h6>
                      </div>
                      <span>{{ auth?.email }}</span>
                    </li>
                  </ul>
                </div>
              </b-card-body>
              <b-card-footer class="bg-white border-0 pt-0">
                <b-btn
                  variant="primary w-100 py-3"
                  @click="submit"
                  pill
                  :disabled="
                    !validate || pending.profile || pending.submit || salt
                  "
                >
                  <span class="text-15 text-md-18">
                    <template v-if="salt"> 정보가 저장되었습니다 </template>
                    <template v-else-if="pending.submit">
                      <b-spinner small />
                    </template>
                    <template v-else> 정보 저장하기 </template>
                  </span>
                </b-btn>
              </b-card-footer>
            </b-card>
            <div class="my-3 px-5">
              <b-btn
                variant="outline-alert px-3 w-100"
                :to="{ name: 'auth-logout' }"
                pill
                >로그아웃
              </b-btn>
            </div>
            <!-- <div class="d-flex justify-content-center my-3">
              <b-btn
                variant="link p-0 text-light text-14 mx-4"
                @click="
                  $router.push({
                    name: 'auth-edit-pwd',
                  })
                "
              >
                비밀번호 변경하기
              </b-btn>
              <b-btn
                variant="link p-0 text-light text-14 mx-4 "
                @click="onRemoveUser"
              >
                회원 탈퇴하기
              </b-btn>
            </div> -->
          </template>
        </b-col>
      </b-row>
    </article>
  </b-container>
</template>

<script>
import { resize } from "~/plugins/commons.js";
import { validateIdHelper, validateNicknameHelper } from "~/plugins/helper";

export default {
  name: "auth-mypage",
  // layout: "trash",
  head() {
    return {
      title: `다다매거진 | 마이페이지`,
    };
  },
  props: {
    auth: {
      type: [Object, String],
      default: null,
    },
  },
  data() {
    return {
      pending: {
        init: true,
        profile: false,
        email: false,
        pid: false,
        nickname: false,
        submit: false,
        submit: false,
      },
      input: {
        profile_image: null,
        profile_image_url: null,
        nickname: null,
        introduction: null,
      },

      check: {
        email: null,
        pid: null,
        nickname: null,
      },
      fileAttached: null,
      resize,
    };
  },
  computed: {
    validate() {
      // 입력체크
      const { pid, nickname } = this.input;

      // 중복체크
      const allChecked =
        this.state.pid &&
        this.check.pid &&
        this.state.nickname &&
        this.check.nickname;

      return pid && nickname && allChecked;
    },
    state() {
      const pid =
        this.input?.pid === this.auth?.pid || validateIdHelper(this.input?.pid);
      const nickname =
        this.input?.nickname === this.auth?.nickname ||
        validateNicknameHelper(this.input?.nickname, 15);
      const introduction =
        this.input.introduction?.length >= 0 &&
        this.input.introduction?.length <= 50;
      return {
        pid,
        nickname,
        introduction,
      };
    },
    // 상태 확인할 salt
    salt() {
      return this.$store.getters.getSalt["mypageUpdated"];
    },
  },

  async mounted() {
    await this.init();
  },
  methods: {
    async init() {
      if (!this.auth) {
        await this.$store.dispatch("setUser");
      }
      this.input = {
        ...this.auth,
      };
      this.checkUser("pid", this.input.pid);
      this.checkUser("nickname", this.input.nickname);
      this.pending.init = false;
    },
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
          // console.log("uploadedFile:", uploadedFile);
          await this.$nextTick();
          this.input = {
            ...this.input,
            profile_image: uploadedFile.name,
            profile_image_url: uploadedFile.url,
          };
          // this.input.profile_image = uploadedFile.name;
          // this.input.profile_image_url = uploadedFile.url;

          this.pending.profile = false;
        }
      });
    },
    // 정보 업데이트
    async submit() {
      this.pending.submit = true;
      const { setUserInfo } = this.$firebase();
      try {
        const data = await setUserInfo({
          ...this.input,
          email: this.auth.email,
        });
        if (data) {
          window.toast("유저정보가 업데이트 되었습니다.");
          this.pending.submit = true;
          this.$store.commit("setSalt", ["mypageUpdated", true]);
          // this.$router.push("/");
        }
      } catch (error) {
        console.error("error:", error);
        window.toast("유저정보가 업데이트에 실패했습니다.");
        this.pending.submit = false;
      }
      this.pending.submit = false;
    },
    // 회원삭제
    async onRemoveUser() {
      window.toast("죄송합니다. 현재 기능 준비중입니다.");
    },
    // 유저 중복 체크
    async checkUser(field, value) {
      if (value && value !== "") {
        if (this.auth[field] === value) {
          this.check[field] = true;
          this.pending[field] = false;
        } else {
          this.pending[field] = true;
          const { checkDuplicate } = this.$firebase();
          try {
            const check = await checkDuplicate(field, value);
            this.check[field] = !check;
            this.pending[field] = false;
          } catch (error) {
            console.error("error:", error);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.input-profile_image {
  position: relative;
  .icon-wrap {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    // background-color: $info;
    border: 1px solid $info;
    background-color: $lightest;
    position: absolute;
    bottom: 0;
    right: -10px;
    z-index: 10;
    color: $info;
    display: flex;
    align-items: center;
    justify-self: center;
    text-align: center;
  }
}
</style>
