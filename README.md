# 1. Aller dans l'ancien repo (s'il est déjà cloné)
cd /home/salah/salahnomad.github.io   # ou le chemin où vous l'avez cloné

# Si vous ne l'avez pas cloné en local, vous pouvez le modifier directement depuis GitHub :
# aller sur github.com/salahnomad/salahnomad.github.io → cliquez sur le crayon (Edit) du README.md

# 2. Ouvrir README.md dans un éditeur
nano README.md

# 3. Supprimer tout le contenu actuel et coller la version corrigée (celle de votre audit)

# 4. Sauvegarder (Ctrl+O, Entrée, Ctrl+X)

# 5. Committer et pousser
git add README.md
git commit -m "security: remove sensitive infrastructure details from README"
git push origin main
