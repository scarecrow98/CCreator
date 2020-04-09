<?php

namespace App\Repositories\Interfaces;

interface PageRepositoryInterface {    
    /**
     * savePage
     * Elmenti az átadott tömbben lévő page adatait és visszaadja a lementett page rekordot
     * @param  array $page
     * @return App\Models\Page
     */
    public function savePage(array $page);

        
    /**
     * getPage
     * Visszaad egy page rekordot a widgeteivel és created_by user objektummla együtt.
     * @param  int $id
     * @return App\Models\Page
     */
    public function getPage($id);

        
    /**
     * getAllPages
     * Visszaadja az alkalmazás összes oldalát.
     * @return App\Models\Page[]
     */
    public function getAllPages();
}