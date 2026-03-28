cat > themes/salah-nomad-theme/layouts/shortcodes/waitlist-city.html << 'EOF'
{{ $city := .Get "name" | default "city" }}
<div class="waitlist-form">
  <form action="https://formspree.io/f/mzzrrwrz" method="POST">
    <input type="email" name="email" placeholder="Your email address" required>
    <input type="hidden" name="_subject" value="Waitlist: {{ $city }}">
    <input type="text" name="_gotcha" style="display:none !important">
    <button type="submit">Join waitlist →</button>
  </form>
  <p class="waitlist-note">We'll notify you when the {{ $city }} checklist reaches 100 signups – early bird discount guaranteed.</p>
</div>
EOF