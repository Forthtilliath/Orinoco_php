<h1 class="text-center page-title">404<span class="d-none d-xxs-inline"> - Fichier Json non trouvé</span></h1>

<section class="text-center bg-tertiary m-5 p-5 rounded fs-5">
    <p>Le fichier avec l'url &quot;<a href="/" target="_blank" id="url_file" class="fst-italic text-decoration-none text-secondary"><span id="name_file"></span></a>&quot; n'a pas été trouvé !</p>
</section>

<script>
    function putUrl(url) {
        $('#url_file').attr('href', url);
        $('#name_file').text(url);
    }
</script>