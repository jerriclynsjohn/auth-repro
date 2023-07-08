<script lang="ts">
  import { signIn } from '@auth/sveltekit/client';

  function googleSignIn() {
    signIn('google', { callbackUrl: '/dashboard' });
  }
  function githubSignIn() {
    signIn('github', { callbackUrl: '/dashboard' });
  }
</script>

<div class="mt-11 flex flex-col items-center justify-center gap-3">
  <button on:click={githubSignIn} class="rounded-sm bg-slate-900 px-6 py-4 text-white"
    >Github</button>
  <button on:click={googleSignIn} class="rounded-sm bg-slate-900 px-6 py-4 text-white"
    >Google</button>
</div>
