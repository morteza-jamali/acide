<?php
        
        return
            [
                'paths' => [
                    'migrations' => 'database/migrations',
                    'seeds' => 'database/seeds'
                ],
                'environments' => [
                    'default_migration_table' => 'phinxlog',
                    'default_database' => 'development',
                    'production' => [
                        'adapter' => 'mysql',
                        'host' => 'localhost',
                        'name' => 'ac_database',
                        'user' => 'root',
                        'pass' => 'toor',
                        'port' => '3306',
                        'charset' => 'utf8',
                    ],
                    'development' => [
                        'adapter' => 'mysql',
                        'host' => 'localhost',
                        'name' => 'ac_database',
                        'user' => 'root',
                        'pass' => 'toor',
                        'port' => '3306',
                        'charset' => 'utf8',
                    ],
                    'testing' => [
                        'adapter' => 'mysql',
                        'host' => 'localhost',
                        'name' => 'ac_database',
                        'user' => 'root',
                        'pass' => 'toor',
                        'port' => '3306',
                        'charset' => 'utf8',
                    ]
                ],
                'version_order' => 'creation'
            ]; ?>