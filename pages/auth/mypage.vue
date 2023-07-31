<template>
  <b-container>
    <article class="mt-5">
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
                          size="6rem"
                          :src="input.profile_image_url"
                          alt="프로필 이미지"
                        />
                      </template>
                      <template v-else>
                        <b-avatar size="6rem" />
                      </template>
                    </template>
                    <div class="icon-wrap">
                      <i class="icon icon-file-image m-auto" />
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
                <li class="mb-4">
                  <h6 class="mb-2">이메일</h6>
                  <span>{{ auth?.email }}</span>
                </li>
                <li class="mb-4">
                  <h6 class="mb-2">프로필 아이디</h6>
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
                          <b-spinner small /> 중복된 아이디인지 검사중입니다...
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
                <li class="mb-4">
                  <h6 class="mb-2">별명</h6>
                  <b-form-group :state="state.nickname">
                    <b-form-input
                      id="nickname"
                      type="text"
                      v-model="input.nickname"
                      @input="checkUser('nickname', input.nickname)"
                      placeholder="닉네임을 입력하세요"
                      :state="state.nickname"
                    />
                    <b-form-invalid-feedback>
                      <span class="text-14 text-lg-15 fw-700 text-alert">
                        <i class="icon icon-window-close" />
                        사용할 수 없는 닉네임입니다
                      </span>
                      <small class="d-block text-alert">
                        2~15자 한/영조합
                      </small>
                    </b-form-invalid-feedback>
                    <template v-if="state.nickname">
                      <template v-if="pending.nickname">
                        <span>
                          <b-spinner small /> 중복된 닉네임인지 검사중입니다...
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
                            사용가능한 닉네임입니다
                          </template>
                          <template v-if="check.nickname === false">
                            중복된 아이디입니다.
                          </template>
                        </span>
                      </template>
                    </template>
                  </b-form-group>
                </li>
              </ul>
            </b-card-body>
            <b-card-footer class="bg-white border-0 pt-0">
              <b-btn
                variant="primary w-100 py-2"
                @click="submit"
                pill
                :disabled="!validate || pending.profile || pending.submit"
              >
                <span class="text-14"> 정보 저장하기</span>
              </b-btn>
            </b-card-footer>
          </b-card>
          <div
            class="d-flex flex-column flex-lg-row justify-content-between my-3"
          >
            <b-btn variant="link p-0 text-light text-14" @click="onRemoveUser">
              회원 탈퇴하기
            </b-btn>
            <b-btn
              variant="outline-alert px-3"
              :to="{ name: 'auth-logout' }"
              pill
              >로그아웃
            </b-btn>
          </div>
        </b-col>
      </b-row>
    </article>
    <!-- validate: {{ validate }} -->
  </b-container>
</template>

<script>
import { resize } from "~/plugins/commons.js";
import { validateIdHelper, validateNicknameHelper } from "~/plugins/helper";

export default {
  name: "auth-mypage",
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
      return {
        pid,
        nickname,
      };
    },
  },

  mounted() {
    if (this.auth) {
      this.input = {
        ...this.auth,
      };
      this.checkUser("pid", this.input.pid);
      this.checkUser("nickname", this.input.nickname);
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
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: $info;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    color: white;
    display: flex;
    align-items: center;
    justify-self: center;
    text-align: center;
  }
}
</style>
