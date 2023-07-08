<script>
  import '../app.css';

  import { signOut } from '@auth/sveltekit/client';

  function logout() {
    signOut();
  }
</script>

<div class="flex items-center justify-between px-8 py-4">
  <span>Logo</span>
  <div class="flex gap-8">
    <a href="/login">Login</a>
    <button on:click|preventDefault={logout}>Logout</button>
  </div>
</div>
<slot />
