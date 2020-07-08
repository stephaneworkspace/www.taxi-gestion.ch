/******************************************************************************
 * _____          _        ____           _   _                   _
 *|_   _|_ ___  _(_)      / ___| ___  ___| |_(_) ___  _ __    ___| |__
 *  | |/ _` \ \/ / |_____| |  _ / _ \/ __| __| |/ _ \| '_ \  / __| '_ \
 *  | | (_| |>  <| |_____| |_| |  __/\__ \ |_| | (_) | | | || (__| | | |
 *  |_|\__,_/_/\_\_|      \____|\___||___/\__|_|\___/|_| |_(_)___|_| |_|
 *
 * By Stéphane Bressani
 *  ____  _             _
 * / ___|| |_ ___ _ __ | |__   __ _ _ __   ___
 * \___ \| __/ _ \ '_ \| '_ \ / _` | '_ \ / _ \
 *  ___) | ||  __/ |_) | | | | (_| | | | |  __/
 * |____/ \__\___| .__/|_| |_|\__,_|_| |_|\___|
 *               | |stephane-bressani.ch
 *               |_|github.com/stephaneworkspace
 *
 * The licence is divided in two parts
 *
 * 1. Backend Asp.net C# part:
 *
 * This program is free software; the source ode is released under and Creative
 * Commons License.
 *
 * 2. Frontend Angular part:
 *
 * For the design, the code is not free:
 * You have to buy a licence to use it:
 * -> Gradus on https://www.themeforest.net/
 * -> Telerik Progress Kendo UI on https://www.telerik.com
 * For the rest, the source code is released under a Creative Commons License.
 *****************************************************************************/
import {Injectable} from '@angular/core';

@Injectable()
export class TodoService {

  private pTodoList = [
    {text : 'Check me out'}, {
      text :
          'Curabitur dignissim nunc a tellus euismod, quis pretium ipsum convallis'
    },
    {
      text :
          'Vivamus dapibus pulvinar ipsum, sit amet elementum sapien tincidunt non'
    },
    {text : 'Praesent viverra nisl a pharetra viverra'}, {
      text :
          'Lorem ipsum dolor sit amet, possit denique oportere at his, etiam corpora deseruisse te pro'
    },
    {text : 'Ex has semper alterum, expetenda dignissim'},
    {text : 'Nulla nisl urna, lobortis in leo vel, porta faucibus nulla'},
    {text : 'Simul erroribus ad usu'}
  ];

  public getTodoList() { return this.pTodoList; }
}
