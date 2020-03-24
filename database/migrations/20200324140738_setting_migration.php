<?php

    use Phinx\Migration\AbstractMigration;

    class SettingMigration extends AbstractMigration {
        private $tbl_name = "settings";

        public function up() {
            $table = $this->table($this->tbl_name);
            $table->addColumn('key', 'string' , ['default' => ''])
                ->addColumn('value' , 'string' , ['default' => ''])
                ->create();
        }

        public function down()
        {
            $this->table($this->tbl_name)->drop()->save();
        }
    }
?>
