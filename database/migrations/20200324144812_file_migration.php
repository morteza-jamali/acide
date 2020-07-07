<?php
    use Phinx\Migration\AbstractMigration;

    class FileMigration extends AbstractMigration {
        private $tbl_name = "files";

        public function up() {
            $table = $this->table($this->tbl_name);
            $table->addColumn('project', 'string' , ['default' => ''])
                ->addColumn('name' , 'string' , ['default' => ''])
                ->addColumn('path' , 'string' , ['default' => ''])
                ->addColumn('type' , 'string' , ['default' => 'file'])
                ->create();
        }

        public function down()
        {
            $this->table($this->tbl_name)->drop()->save();
        }
    }
?>
