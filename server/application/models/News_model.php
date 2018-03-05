<?php

class News_model extends CI_Model {
    public function __construct()
    {
        $this->load->database();
    }

    public function get_news($slug = FALSE) {
        if ($slug === FALSE) {
            $query = $this->db->get('news');
            return $query->result_array();
        }

        $query = $this->db->get_where('news', array('slug' => $slug));
        return $query->result_array();
    }

    public function set_news() {
        $this->load->helper('url');
        $slug = url_title($this->inpu->post('tilte'), 'dash', TRUE);
        $data = array(
          'title' => $this->input->post('title'),
          'slug' => $slug,
          'text' => $this->input->post('text')
        );

        $this->db->insert('news', $data);
    }
}